"""
VimShi Cooking - Secure Backend Server & Protected Admin Portal
Author: VimShi Cooking Dev Team
Security: Werkzeug scrypt/PBKDF2 salted hash, HttpOnly & SameSite=Strict cookies, IP rate-limiting.
"""

import os
import sys
import json
import secrets
import time
import threading
from datetime import datetime, timedelta
from functools import wraps

from flask import (
    Flask, render_template, request, redirect, url_for,
    session, jsonify, send_from_directory, abort
)
import jinja2
from werkzeug.security import generate_password_hash, check_password_hash

import ai_engine

# Working Directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_FILE = os.path.join(BASE_DIR, 'credentials.json')
RECIPES_FILE = os.path.join(BASE_DIR, 'recipes_db.json')
MESSAGES_FILE = os.path.join(BASE_DIR, 'messages_db.json')
SECRET_KEY_FILE = os.path.join(BASE_DIR, '.secret_key')

# Support templates in either ./templates or the root repository folder
app = Flask(__name__, static_folder='.')
app.jinja_loader = jinja2.ChoiceLoader([
    jinja2.FileSystemLoader(os.path.join(BASE_DIR, 'templates')),
    jinja2.FileSystemLoader(BASE_DIR)
])

# -------------------------------------------------------------
# SESSION SECURITY CONFIGURATION
# -------------------------------------------------------------
secret = os.environ.get('SECRET_KEY')
if not secret:
    if os.path.exists(SECRET_KEY_FILE):
        try:
            with open(SECRET_KEY_FILE, 'r') as f:
                secret = f.read().strip()
        except Exception:
            secret = None
    if not secret:
        secret = secrets.token_hex(32)
        try:
            with open(SECRET_KEY_FILE, 'w') as f:
                f.write(secret)
        except Exception:
            pass

app.secret_key = secret

app.config.update(
    SESSION_COOKIE_HTTPONLY=True,       # Prevents JavaScript reading session cookies (XSS protection)
    SESSION_COOKIE_SAMESITE='Strict',   # Blocks Cross-Site Request Forgery (CSRF protection)
    SESSION_COOKIE_SECURE=False,        # Set to True when deploying under HTTPS
    PERMANENT_SESSION_LIFETIME=timedelta(hours=4)
)

# -------------------------------------------------------------
# ANTI-BRUTE FORCE RATE LIMITER (In-Memory IP Tracker)
# -------------------------------------------------------------
# Structure: { ip_address: [timestamp1, timestamp2, ...] }
FAILED_LOGIN_ATTEMPTS = {}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_WINDOW_SECONDS = 900  # 15 minutes

def is_ip_rate_limited(ip):
    now = time.time()
    attempts = FAILED_LOGIN_ATTEMPTS.get(ip, [])
    # Keep only attempts within the sliding window
    attempts = [t for t in attempts if now - t < LOCKOUT_WINDOW_SECONDS]
    FAILED_LOGIN_ATTEMPTS[ip] = attempts
    return len(attempts) >= MAX_FAILED_ATTEMPTS

def record_failed_attempt(ip):
    now = time.time()
    if ip not in FAILED_LOGIN_ATTEMPTS:
        FAILED_LOGIN_ATTEMPTS[ip] = []
    FAILED_LOGIN_ATTEMPTS[ip].append(now)

def clear_failed_attempts(ip):
    if ip in FAILED_LOGIN_ATTEMPTS:
        del FAILED_LOGIN_ATTEMPTS[ip]

# -------------------------------------------------------------
# CREDENTIALS & DATABASE INITIALIZATION
# -------------------------------------------------------------
def get_credentials():
    if not os.path.exists(CREDENTIALS_FILE):
        # Default initial credentials: admin / VimShi@Admin2026
        default_creds = {
            "username": "admin",
            "password_hash": generate_password_hash("VimShi@Admin2026")
        }
        with open(CREDENTIALS_FILE, 'w', encoding='utf-8') as f:
            json.dump(default_creds, f, indent=2)
        return default_creds
    
    with open(CREDENTIALS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_credentials(creds):
    with open(CREDENTIALS_FILE, 'w', encoding='utf-8') as f:
        json.dump(creds, f, indent=2)

def get_recipes():
    if not os.path.exists(RECIPES_FILE):
        # Initial seed: read from data.js if exists, or generate defaults
        seed = []
        try:
            with open(os.path.join(BASE_DIR, 'data.js'), 'r', encoding='utf-8') as f:
                content = f.read()
                start = content.find('const FEATURED_RECIPES = ') + len('const FEATURED_RECIPES = ')
                end = content.find('const ALL_VIDEOS = ')
                json_str = content[start:end].strip().rstrip(';')
                seed = json.loads(json_str)
        except Exception:
            seed = []
        with open(RECIPES_FILE, 'w', encoding='utf-8') as f:
            json.dump(seed, f, indent=2, ensure_ascii=False)
        return seed

    with open(RECIPES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_recipes(recipes):
    with open(RECIPES_FILE, 'w', encoding='utf-8') as f:
        json.dump(recipes, f, indent=2, ensure_ascii=False)

def get_messages():
    if not os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2)
        return []
    with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_messages(messages):
    with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, indent=2, ensure_ascii=False)

# Ensure initialized
get_credentials()
get_recipes()
get_messages()

# -------------------------------------------------------------
# AUTHENTICATION ROUTE GUARD DECORATOR
# -------------------------------------------------------------
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            # Reject immediately - no admin HTML is ever delivered!
            if request.path.startswith('/api/admin'):
                return jsonify({"error": "Unauthorized. Admin session required."}), 401
            return redirect(url_for('login', next=request.path))
        return f(*args, **kwargs)
    return decorated_function

# -------------------------------------------------------------
# PUBLIC ROUTES & STATIC ASSETS
# -------------------------------------------------------------
@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    # Prevent directory traversal attacks
    safe_files = {'app.js', 'data.js', 'styles.css'}
    if filename in safe_files:
        return send_from_directory(BASE_DIR, filename)
    abort(404)

@app.route('/api/recipes', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())

@app.route('/api/contact', methods=['POST'])
def api_contact():
    data = request.get_json(silent=True) or request.form.to_dict() or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    inquiry_type = (data.get('inquiry_type') or 'General').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required."}), 400

    messages = get_messages()
    new_entry = {
        "id": secrets.token_hex(6),
        "name": name,
        "email": email,
        "inquiry_type": inquiry_type,
        "message": message,
        "created_at": datetime.now().strftime("%d %b %Y, %I:%M %p")
    }
    messages.insert(0, new_entry)
    save_messages(messages)
    return jsonify({"success": True, "message": "Inquiry submitted successfully."})

# -------------------------------------------------------------
# AUTHENTICATION (LOGIN & LOGOUT)
# -------------------------------------------------------------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get('logged_in'):
        return redirect(url_for('admin_dashboard'))

    error = None
    client_ip = request.remote_addr or '127.0.0.1'

    if request.method == 'POST':
        # Check brute force rate limit
        if is_ip_rate_limited(client_ip):
            error = "Too many failed attempts from your IP. Temporarily locked for 15 minutes."
            return render_template('login.html', error=error), 429

        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')

        creds = get_credentials()
        # Secure salted hash comparison
        if username == creds.get('username') and check_password_hash(creds.get('password_hash'), password):
            clear_failed_attempts(client_ip)
            session.permanent = True
            session['logged_in'] = True
            session['admin_user'] = username
            session['login_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            next_url = request.args.get('next') or url_for('admin_dashboard')
            return redirect(next_url)
        else:
            record_failed_attempt(client_ip)
            remaining = MAX_FAILED_ATTEMPTS - len(FAILED_LOGIN_ATTEMPTS.get(client_ip, []))
            if remaining > 0:
                error = f"Invalid username or password. {remaining} attempt(s) remaining."
            else:
                error = "Too many failed attempts. Locked out for 15 minutes."

    return render_template('login.html', error=error)

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('login'))

# -------------------------------------------------------------
# PROTECTED ADMIN DASHBOARD & MANAGEMENT APIS
# -------------------------------------------------------------
@app.route('/admin')
@login_required
def admin_dashboard():
    return render_template('admin.html')

@app.route('/api/admin/messages', methods=['GET'])
@login_required
def api_admin_get_messages():
    return jsonify(get_messages())

@app.route('/api/admin/messages/<msg_id>', methods=['DELETE'])
@login_required
def api_admin_delete_message(msg_id):
    messages = get_messages()
    messages = [m for m in messages if m.get('id') != msg_id]
    save_messages(messages)
    return jsonify({"success": True})

@app.route('/api/admin/recipes', methods=['POST'])
@login_required
def api_admin_save_recipe():
    data = request.get_json()
    if not data or not data.get('id') or not data.get('title'):
        return jsonify({"error": "Recipe ID and title are required."}), 400

    recipes = get_recipes()
    # Check if updating existing or creating new
    existing_idx = next((i for i, r in enumerate(recipes) if r['id'] == data['id']), None)
    if existing_idx is not None:
        recipes[existing_idx] = data
    else:
        recipes.insert(0, data)

    save_recipes(recipes)
    return jsonify({"success": True})

@app.route('/api/admin/recipes/<recipe_id>', methods=['DELETE'])
@login_required
def api_admin_delete_recipe(recipe_id):
    recipes = get_recipes()
    recipes = [r for r in recipes if r.get('id') != recipe_id]
    save_recipes(recipes)
    return jsonify({"success": True})

@app.route('/api/admin/change-password', methods=['POST'])
@login_required
def api_admin_change_password():
    data = request.get_json()
    current_pass = data.get('currentPassword', '')
    new_pass = data.get('newPassword', '')

    if len(new_pass) < 8:
        return jsonify({"error": "New password must be at least 8 characters long."}), 400

    creds = get_credentials()
    if not check_password_hash(creds.get('password_hash'), current_pass):
        return jsonify({"error": "Current password is incorrect."}), 400

    # Generate new modern cryptographic hash
    creds['password_hash'] = generate_password_hash(new_pass)
    save_credentials(creds)
    return jsonify({"success": True, "message": "Password updated successfully."})

# -------------------------------------------------------------
# AI AUTOPILOT ENGINE & BACKGROUND WORKER
# -------------------------------------------------------------
def ai_autopilot_worker():
    """
    Background worker thread that wakes up periodically.
    If mode is 'ai', checks YouTube & social media feeds for new uploads.
    """
    while True:
        try:
            settings = ai_engine.load_settings()
            if settings.get('mode') == 'ai':
                # Check interval
                interval_secs = settings.get('auto_sync_interval_minutes', 30) * 60
                ai_engine.sync_social_feeds()
                time.sleep(interval_secs)
            else:
                # In manual mode, sleep short intervals to re-check if user turned AI back on
                time.sleep(15)
        except Exception as e:
            print("[AI Worker Error]:", e)
            time.sleep(60)

# Start background autopilot thread
threading.Thread(target=ai_autopilot_worker, daemon=True).start()

@app.route('/api/admin/ai-settings', methods=['GET'])
@login_required
def api_admin_get_ai_settings():
    settings = ai_engine.load_settings()
    active_key = ai_engine.get_gemini_api_key()
    if active_key:
        settings['has_gemini_key'] = True
        if not settings.get('gemini_api_key'):
            settings['gemini_api_key'] = active_key[:6] + '...' + active_key[-4:]
    else:
        settings['has_gemini_key'] = False
    return jsonify(settings)

@app.route('/api/admin/toggle-mode', methods=['POST'])
@login_required
def api_admin_toggle_mode():
    data = request.get_json(silent=True) or {}
    settings = ai_engine.load_settings()
    new_mode = data.get('mode')
    
    if new_mode in ['ai', 'manual']:
        settings['mode'] = new_mode
    else:
        settings['mode'] = 'manual' if settings.get('mode') == 'ai' else 'ai'
        
    ai_engine.save_settings(settings)
    return jsonify({"success": True, "mode": settings['mode'], "settings": settings})

@app.route('/api/admin/ai-sync-now', methods=['POST'])
@login_required
def api_admin_ai_sync_now():
    result = ai_engine.sync_social_feeds()
    return jsonify(result)

@app.route('/api/admin/save-gemini-key', methods=['POST'])
@login_required
def api_admin_save_gemini_key():
    data = request.get_json(silent=True) or {}
    key = data.get('gemini_api_key', '').strip()
    settings = ai_engine.load_settings()
    settings['gemini_api_key'] = key
    ai_engine.save_settings(settings)
    return jsonify({"success": True, "message": "Gemini API Key saved and activated!"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"[*] Starting VimShi Cooking Secure Server on port {port}...")
    print(f"[*] Admin Portal available at: http://localhost:{port}/admin")
    print(f"[*] Default Credentials: Username: admin | Password: VimShi@Admin2026")
    app.run(host='0.0.0.0', port=port, debug=False)
