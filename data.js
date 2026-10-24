// VimShi Cooking - Channel & Recipe Database
const CHANNEL_INFO = {
  "title": "VimShi Cooking",
  "handle": "@VimShiCooking",
  "instagramHandle": "@vimshi_cooking",
  "facebookName": "𝓥𝓲𝓶𝓢𝓱𝓲 𝓒𝓸𝓸𝓴𝓲𝓷𝓰",
  "youtubeUrl": "https://youtube.com/@vimshicooking?si=TqQQ_rovL1YyC3ep",
  "instagramUrl": "https://www.instagram.com/vimshi_cooking?igsh=aHJvOXJod3kwMzhz",
  "facebookUrl": "https://www.facebook.com/people/%F0%9D%93%A5%F0%9D%93%B2%F0%9D%93%B6%F0%9D%93%A2%F0%9D%93%B1%F0%9D%93%B2-%F0%9D%93%92%F0%9D%93%B8%F0%9D%93%B8%F0%9D%93%B4%F0%9D%93%B2%F0%9D%93%B7%F0%9D%93%B0/61551843089617/?mibextid=LQQJ4d",
  "avatar": "https://yt3.googleusercontent.com/dV_NHfyFB_A9rwbWwd-zGpNseeY-WozgBLVc4XZHpnxZnuKClarYzU-NGe5YVBESV15f6V-BfQ=s160-c-k-c0x00ffffff-no-rj",
  "banner": "https://yt3.googleusercontent.com/39gFZ58g2mTnTknjMgv63ciH6EQuxo7cBqivAxsS1fp_HM_hkO1AXvETQHOxy0juqXrFflyz5w=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
  "subscribers": "1.14K+",
  "videosCount": "1,200+",
  "joined": "September 2023",
  "country": "India",
  "tagline": "Innovative Recipes • Authentic Flavors • Creative Baking",
  "bio": "Welcome to VimShi Cooking! Explore a world of both cooking and baking with our unique and innovative recipes. From delicious dishes to creative cakes, we bring you a variety of flavors to inspire your culinary journey. Join us for exciting, easy-to-follow recipes that add a special twist to your kitchen creations!"
};

const FEATURED_RECIPES = [
  {
    "id": "mJD_rrUFZjs",
    "title": "Rabdi Rice Kheer (Sharad Purnima Special)",
    "hindiTitle": "रबड़ी चावल की खीर",
    "category": "sweets",
    "categoryName": "Sweets & Desserts",
    "badge": "Festive Special",
    "duration": "25 mins",
    "prepTime": "10 mins",
    "cookTime": "25 mins",
    "difficulty": "Easy",
    "diet": "Pure Vegetarian",
    "rating": 4.9,
    "views": "54+ views",
    "published": "Recent",
    "description": "Rich, creamy, slow-simmered rabdi-style rice kheer infused with cardamom, saffron, and roasted nuts. Perfect for Sharad Purnima and auspicious occasions.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 1,
        "unit": "liter",
        "name": "Full Cream Milk"
      },
      {
        "amount": 50,
        "unit": "g",
        "name": "Basmati Rice (Soaked & Crushed)"
      },
      {
        "amount": 80,
        "unit": "g",
        "name": "Sugar / Mishri"
      },
      {
        "amount": 4,
        "unit": "pods",
        "name": "Green Cardamom (Crushed)"
      },
      {
        "amount": 15,
        "unit": "strands",
        "name": "Kesar / Saffron (soaked in warm milk)"
      },
      {
        "amount": 25,
        "unit": "g",
        "name": "Sliced Almonds & Pistachios"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Desi Ghee (for roasting rice)"
      }
    ],
    "steps": [
      "Wash and soak basmati rice for 20 minutes, then coarsely crush by hand or pulse lightly.",
      "Bring full cream milk to a boil in a heavy-bottomed kadai, stirring often to scrape the cream from sides.",
      "Add crushed rice and simmer on low heat for 18-20 minutes until milk turns thick and rabdi-like.",
      "Stir in saffron milk, cardamom powder, and sugar; cook for 4 more minutes until dissolved.",
      "Garnish with golden roasted nuts and serve warm or chilled under the moonlight!"
    ],
    "chefTip": "Crushing the soaked rice grains slightly releases extra starch, giving that luscious authentic rabdi thickness without cornflour."
  },
  {
    "id": "9tIEKNVhYWg",
    "title": "3-Min ZERO OIL Crispy Lauki Dosa",
    "hindiTitle": "बिना तेल का कुरकुरा लौकी डोसा",
    "category": "healthy",
    "categoryName": "Zero-Oil & Healthy",
    "badge": "Weight Loss",
    "duration": "15 mins",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "difficulty": "Easy",
    "diet": "Vegan & Gluten-Free",
    "rating": 5.0,
    "views": "80+ views",
    "published": "1 month ago",
    "description": "Innovative guilt-free crispy dosa made with fresh grated bottle gourd (lauki) and rice flour. Zero oil, rich in fiber, and packed with cooling nutrition.",
    "servings": 3,
    "ingredients": [
      {
        "amount": 1,
        "unit": "cup",
        "name": "Fresh Lauki / Bottle Gourd (Peeled & Grated)"
      },
      {
        "amount": 1,
        "unit": "cup",
        "name": "Rice Flour (Chawal ka Aata)"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Semolina / Sooji (optional for extra crunch)"
      },
      {
        "amount": 2,
        "unit": "cups",
        "name": "Water (adjust to thin buttermilk consistency)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Jeera / Cumin Seeds"
      },
      {
        "amount": 2,
        "unit": "pieces",
        "name": "Green Chillies & Ginger (finely chopped)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Pink Himalayan Salt"
      }
    ],
    "steps": [
      "In a bowl, mix grated lauki, rice flour, cumin seeds, ginger, green chilies, and salt.",
      "Gradually pour water to create a thin, pouring batter similar to Rava Dosa.",
      "Heat a non-stick tawa on high flame until very hot. Pour batter from the perimeter toward center.",
      "Cook without oil on medium flame for 3 minutes until edges curl up crisply.",
      "Fold and serve piping hot with spicy mint or roasted tomato chutney."
    ],
    "chefTip": "Do not squeeze the water out of the grated lauki; its natural juices keep the dosa light, digestible, and ultra crisp!"
  },
  {
    "id": "qv-MglA1plA",
    "title": "Healthy Dates & Walnut Mithai (No Sugar, No Ghee)",
    "hindiTitle": "खजूर अखरोट मिठाई (नो शुगर, नो घी)",
    "category": "sweets",
    "categoryName": "Sweets & Desserts",
    "badge": "No Added Sugar",
    "duration": "15 mins",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "difficulty": "Easy",
    "diet": "Naturally Vegan",
    "rating": 4.9,
    "views": "129+ views",
    "published": "12 days ago",
    "description": "A festive guilt-free luxury mithai roll packed with rich Iranian dates, toasted California walnuts, pistachios, and poppy seeds. Zero refined sugar, zero ghee or butter.",
    "servings": 6,
    "ingredients": [
      {
        "amount": 250,
        "unit": "g",
        "name": "Soft Seedless Dates (Khajoor)"
      },
      {
        "amount": 50,
        "unit": "g",
        "name": "Crispy Walnuts (roughly chopped)"
      },
      {
        "amount": 50,
        "unit": "g",
        "name": "Almonds & Cashews (sliced)"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "White Sesame Seeds or Poppy Seeds (Khus Khus)"
      },
      {
        "amount": 0.5,
        "unit": "tsp",
        "name": "Green Cardamom Powder"
      },
      {
        "amount": 1,
        "unit": "pinch",
        "name": "Nutmeg Powder"
      }
    ],
    "steps": [
      "Coarsely blend the soft seedless dates in a mixer without adding any water.",
      "Dry roast the chopped walnuts, almonds, and cashews in a pan on gentle heat until fragrant.",
      "In the same pan, warm the date paste for 2-3 minutes until soft and pliable.",
      "Add the warm roasted nuts, cardamom, and nutmeg into the dates; mix until well combined.",
      "Shape into a tight log, roll over toasted sesame or poppy seeds, chill for 30 minutes, and slice into discs!"
    ],
    "chefTip": "Warming the date paste on very low heat activates natural fruit oils, binding the dry fruit roll without needing even half a drop of ghee."
  },
  {
    "id": "yJtcttYs28s",
    "title": "Besan Paneer Gravy (Different from Paneer & Chole)",
    "hindiTitle": "शाही बेसन पनीर ग्रेवी रेसिपी",
    "category": "curries",
    "categoryName": "Curries & Gravies",
    "badge": "Chef Special",
    "duration": "30 mins",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "difficulty": "Medium",
    "diet": "Vegetarian",
    "rating": 4.9,
    "views": "115+ views",
    "published": "6 days ago",
    "description": "Bored of regular shahi paneer? Experience spiced besan rolls simmered in a velvet rich tomato-cashew curry infused with kasuri methi and aromatic spices.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 1,
        "unit": "cup",
        "name": "Gram Flour (Besan)"
      },
      {
        "amount": 150,
        "unit": "g",
        "name": "Fresh Malai Paneer (grated / cubes)"
      },
      {
        "amount": 3,
        "unit": "large",
        "name": "Ripe Tomatoes (pureed with ginger)"
      },
      {
        "amount": 10,
        "unit": "pieces",
        "name": "Cashews (soaked in warm water)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Kasuri Methi (crushed)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Degi Mirch & Turmeric"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Garam Masala & Coriander Powder"
      }
    ],
    "steps": [
      "Prepare a smooth besan batter with paneer, mild spices, and steam or pan-grill into savory pinwheels.",
      "Blend soaked cashews and tomatoes into a satin gravy base.",
      "Heat spices in a pan, cook the puree until aromatic and oil separates gently.",
      "Add warm water to adjust gravy consistency, simmer, and gently slide the besan paneer cuts.",
      "Finish with fresh cream, crushed kasuri methi, and pair with hot naan or paratha."
    ],
    "chefTip": "Gently toast kasuri methi on the lid of your hot pan before crushing between your palms for an intoxicating aroma."
  },
  {
    "id": "qCv8Y9NqX3g",
    "title": "Soya Chunk Curry in Rich Black Gravy",
    "hindiTitle": "विमशी स्पेशल सोया चंक ब्लैक ग्रेवी करी",
    "category": "curries",
    "categoryName": "Curries & Gravies",
    "badge": "High Protein",
    "duration": "35 mins",
    "prepTime": "10 mins",
    "cookTime": "25 mins",
    "difficulty": "Medium",
    "diet": "High Protein Vegetarian",
    "rating": 5.0,
    "views": "250+ views",
    "published": "2 weeks ago",
    "description": "High-protein juicy soya chunks bathed in a deeply roasted rustic black gravy made from caramelized charred onions and stone-ground spices. Incredible texture and depth.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 1.5,
        "unit": "cups",
        "name": "Nutritious Soya Chunks (boiled & squeezed)"
      },
      {
        "amount": 3,
        "unit": "large",
        "name": "Onions (sliced and slow-charred)"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Dry Coconut (toasted dark)"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Ginger-Garlic Paste"
      },
      {
        "amount": 2,
        "unit": "tsp",
        "name": "Kala Masala / Roasted Spices"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Kashmiri Red Chilli Powder"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Mustard Oil / Cooking Oil"
      }
    ],
    "steps": [
      "Boil soya chunks in salted water with a bay leaf, drain and squeeze out all excess moisture thoroughly.",
      "Slow-roast sliced onions and dry coconut on medium heat until deep golden brownish black.",
      "Grind the roasted mixture with a splash of water into a fragrant black masala paste.",
      "Sauté ginger-garlic and paste in hot oil, add roasted spices and cook until glossy.",
      "Toss in soya chunks, add boiling water, and simmer for 10 minutes so flavors seep to the core."
    ],
    "chefTip": "Marinating boiled soya chunks with a spoon of curd and kala masala for 10 minutes gives them the tenderest melt-in-mouth bite."
  },
  {
    "id": "t4KR_ib5rOc",
    "title": "Cafe-Style Korean Garlic Cheese Buns",
    "hindiTitle": "कैफे स्टाइल कोरियन चीज बन्स",
    "category": "baking",
    "categoryName": "Snacks & Baking",
    "badge": "Trending Recipe",
    "duration": "25 mins",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "difficulty": "Easy",
    "diet": "Vegetarian",
    "rating": 4.8,
    "views": "60+ views",
    "published": "2 weeks ago",
    "description": "Super soft bakery buns stuffed with velvety cream cheese and drenched in sweet-savory garlic herb butter, baked until golden and crusty outside.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 4,
        "unit": "buns",
        "name": "Soft Burger Buns / Brioche Buns"
      },
      {
        "amount": 150,
        "unit": "g",
        "name": "Cream Cheese (at room temperature)"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Fresh Cream / Milk"
      },
      {
        "amount": 60,
        "unit": "g",
        "name": "Melted Butter"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Minced Garlic"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Honey or Condensed Milk"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Dried Parsley & Chilli Flakes"
      }
    ],
    "steps": [
      "Cut each bun into 6 wedges from top down, being careful not to cut all the way through the base.",
      "Whip cream cheese with cream and a hint of sugar until fluffy, then pipe into the crevices.",
      "Whisk melted butter, minced garlic, honey, and parsley into a decadent dip.",
      "Dip the filled buns generously in garlic butter, coating all grooves.",
      "Bake in an oven or covered kadai at 180°C for 10-12 minutes until crunchy on top and molten inside."
    ],
    "chefTip": "A tiny drizzle of honey in the garlic butter balance out the sharpness of raw garlic, creating that iconic Korean bakery taste."
  },
  {
    "id": "uIzrOxBB6BM",
    "title": "Authentic Himachali Siddu (Steamed & Healthy)",
    "hindiTitle": "पारंपरिक हिमाचली सिड्डू",
    "category": "regional",
    "categoryName": "Regional & Heritage",
    "badge": "Heritage Dish",
    "duration": "40 mins",
    "prepTime": "20 mins",
    "cookTime": "20 mins",
    "difficulty": "Medium",
    "diet": "Pure Vegetarian",
    "rating": 4.9,
    "views": "76+ views",
    "published": "2 months ago",
    "description": "Traditional Pahadi delicacy made with yeast-fermented wheat dough stuffed with spiced walnuts, poppy seeds, and roasted lentils, steamed to pillowy perfection.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 2,
        "unit": "cups",
        "name": "Whole Wheat Flour (Aata)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Active Dry Yeast"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Poppy Seeds / Khus Khus (Soaked)"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Crushed Walnuts"
      },
      {
        "amount": 2,
        "unit": "pieces",
        "name": "Green Chillies & Ginger"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Roasted Cumin Powder & Salt"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Pure Desi Ghee (for serving)"
      }
    ],
    "steps": [
      "Knead wheat flour with yeast and warm water into a soft pliable dough; let it rest to ferment for 1.5 hours.",
      "Grind soaked poppy seeds, walnuts, ginger, green chilies, and salt into a coarse aromatic filling.",
      "Roll a thick portion of dough, place a generous spoonful of filling in the center, and fold like a calzone.",
      "Seal and crimp the edges tightly with finger twists.",
      "Steam in a greased steamer for 18-20 minutes until puffed and firm. Serve sliced and bathed in melted desi ghee."
    ],
    "chefTip": "Steam on high heat with a tight lid covered with a kitchen towel so condensation never drops onto the siddu dough."
  },
  {
    "id": "WKg2o5VT4lU",
    "title": "100% No-Fail Gulab Jamun Fusion Cake",
    "hindiTitle": "गुलाब जामुन फ्यूज़न केक (एगलेस)",
    "category": "baking",
    "categoryName": "Snacks & Baking",
    "badge": "No-Fail Recipe",
    "duration": "45 mins",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "difficulty": "Medium",
    "diet": "100% Eggless",
    "rating": 5.0,
    "views": "150+ views",
    "published": "1 month ago",
    "description": "Ultra-moist cardamom sponge cake soaked in saffron rose syrup, frosted with cardamom whipped cream and decorated with bite-sized gulab jamuns and pistachio flakes.",
    "servings": 8,
    "ingredients": [
      {
        "amount": 1.5,
        "unit": "cups",
        "name": "All-Purpose Flour / Maida"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Curd / Yogurt"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Milk & Vegetable Oil"
      },
      {
        "amount": 0.75,
        "unit": "cup",
        "name": "Powdered Sugar"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Cardamom Powder & Rose Water"
      },
      {
        "amount": 8,
        "unit": "pieces",
        "name": "Small Gulab Jamuns (drained)"
      },
      {
        "amount": 1,
        "unit": "cup",
        "name": "Whipping Cream & Pistachios"
      }
    ],
    "steps": [
      "Whisk curd, sugar, oil, and rose water until creamy and sugar has dissolved completely.",
      "Sift in flour, baking powder, and cardamom powder; fold gently with milk into a ribbon batter.",
      "Pour into a lined 7-inch cake tin and drop halved gulab jamuns into the batter.",
      "Bake at 170°C for 30 minutes until a skewer comes out clean.",
      "Brush warm gulab jamun syrup over the cake, frost with whipped cream, and decorate with halved jamuns & dry rose petals."
    ],
    "chefTip": "Brushing the warm sponge with lukewarm rose-saffron syrup ensures the cake stays melt-in-mouth moist for days in the fridge."
  },
  {
    "id": "qZVNMxWMIn8",
    "title": "3 Unique Flavors of Malai Cham Cham",
    "hindiTitle": "मलाई चम चम - ३ अनोखे फ्लेवर्स",
    "category": "sweets",
    "categoryName": "Sweets & Desserts",
    "badge": "Diwali Special",
    "duration": "35 mins",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "difficulty": "Medium",
    "diet": "Pure Vegetarian",
    "rating": 4.9,
    "views": "92+ views",
    "published": "9 days ago",
    "description": "Halwai-style spongy chenna cham cham prepared in 3 mouthwatering flavors: Saffron Kesar, Royal Rose, and Pistachio Cardamom, layered with velvety mawa malai.",
    "servings": 6,
    "ingredients": [
      {
        "amount": 1,
        "unit": "liter",
        "name": "Cow's Milk (for soft chenna)"
      },
      {
        "amount": 2,
        "unit": "tbsp",
        "name": "Lemon Juice / Vinegar"
      },
      {
        "amount": 1.5,
        "unit": "cups",
        "name": "Sugar (for thin boiling syrup)"
      },
      {
        "amount": 100,
        "unit": "g",
        "name": "Mawa / Khoya (crumbled)"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Saffron, Rose Syrup & Pista Flakes"
      }
    ],
    "steps": [
      "Curdle boiled milk with diluted lemon juice, rinse fresh chenna with cold water and hang for 30 minutes.",
      "Knead chenna with the heel of your palm for 5 minutes until completely smooth and pliable.",
      "Shape into elongated cham cham cylinders without any cracks.",
      "Drop into boiling sugar syrup and boil on high heat covered for 15 minutes until doubled in size.",
      "Cool down, slit lengthwise, and fill with saffron mawa, rose mawa, and pistachio malai!"
    ],
    "chefTip": "Always use fresh cow milk for making chenna sweets; buffalo milk has excess fat which makes cham cham rubbery."
  },
  {
    "id": "uX2FO4yohKw",
    "title": "Bakery-Style Eggless Fudgy Walnut Brownies",
    "hindiTitle": "बेकरी स्टाइल एगलेस फजी ब्राउनीज",
    "category": "baking",
    "categoryName": "Snacks & Baking",
    "badge": "Crinkle Top",
    "duration": "30 mins",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "difficulty": "Easy",
    "diet": "100% Eggless",
    "rating": 5.0,
    "views": "107+ views",
    "published": "2 months ago",
    "description": "Rich, intensely chocolaty brownies with that coveted shiny crinkled top, gooey fudgy center, and roasted crunchy walnuts. No eggs, no condensed milk required!",
    "servings": 8,
    "ingredients": [
      {
        "amount": 150,
        "unit": "g",
        "name": "Dark Couverture Chocolate (55%+)"
      },
      {
        "amount": 75,
        "unit": "g",
        "name": "Butter (unsalted)"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Warm Milk"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Powdered Sugar"
      },
      {
        "amount": 0.75,
        "unit": "cup",
        "name": "Flour & 2 tbsp Cocoa Powder"
      },
      {
        "amount": 50,
        "unit": "g",
        "name": "Roasted Walnut Kernels"
      }
    ],
    "steps": [
      "Melt dark chocolate and butter over a water bath or microwave until glossy.",
      "Whisk warm milk and powdered sugar vigorously for 2 minutes until frothy (secret to crinkle top!).",
      "Combine warm milk mixture with melted chocolate.",
      "Sift in flour and cocoa powder; fold gently with toasted walnuts into a thick glossy batter.",
      "Bake at 170°C for 20-22 minutes. Cool before slicing into luxurious squares."
    ],
    "chefTip": "Dissolving the sugar completely into warm milk until slightly foamy before adding chocolate guarantees the signature glossy paper-thin crinkle crust."
  },
  {
    "id": "1qP5V28-9iE",
    "title": "Halwai-Secret 15-Minute Crispy Juicy Jalebi",
    "hindiTitle": "१५ मिनट में हलवाई जैसी रसीली कुरकुरी जलेबी",
    "category": "sweets",
    "categoryName": "Sweets & Desserts",
    "badge": "Instant Treat",
    "duration": "15 mins",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "difficulty": "Easy",
    "diet": "Vegetarian",
    "rating": 4.9,
    "views": "161+ views",
    "published": "1 month ago",
    "description": "No overnight fermentation needed! Make spiral, golden, juicy jalebis with a shattering crisp crunch soaked in aromatic saffron-cardamom syrup.",
    "servings": 4,
    "ingredients": [
      {
        "amount": 1,
        "unit": "cup",
        "name": "Maida / All Purpose Flour"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Cornflour or Rice Flour (for extra crunch)"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Curd / Dahi (sour)"
      },
      {
        "amount": 0.5,
        "unit": "tsp",
        "name": "Baking Powder or Eno Fruit Salt"
      },
      {
        "amount": 1,
        "unit": "cup",
        "name": "Sugar & Saffron for one-string syrup"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Rose Water & Lemon Juice"
      }
    ],
    "steps": [
      "Boil sugar, water, saffron, and a dash of lemon juice for 5 minutes until sticky one-string syrup forms.",
      "Whisk flour, cornflour, curd, and water into a smooth, lump-free pouring batter.",
      "Add baking powder right before frying and transfer into a squeeze bottle or piping cloth.",
      "Pipe concentric spirals into medium-hot ghee or oil, frying until golden and rigid.",
      "Dip directly into warm sugar syrup for 45 seconds, remove and relish the crackling syrup burst!"
    ],
    "chefTip": "Adding a few drops of lemon juice into the sugar syrup prevents crystallization, keeping your jalebis shiny and glossy even after cooling."
  },
  {
    "id": "Dzu1v6-QNBA",
    "title": "Halwai Secret Monsoon Crispy Samosa",
    "hindiTitle": "हलवाई स्टाइल खस्ता समोसा रेसिपी",
    "category": "snacks",
    "categoryName": "Snacks & Street Food",
    "badge": "Street Favorite",
    "duration": "35 mins",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "difficulty": "Medium",
    "diet": "Pure Vegetarian",
    "rating": 5.0,
    "views": "91+ views",
    "published": "3 months ago",
    "description": "Learn the authentic halwai technique for bubble-free, super flaky crust filled with rustic spicy potato, green peas, roasted cumin, and whole crushed coriander seeds.",
    "servings": 6,
    "ingredients": [
      {
        "amount": 2,
        "unit": "cups",
        "name": "Maida"
      },
      {
        "amount": 4,
        "unit": "tbsp",
        "name": "Desi Ghee or Dalda (Moyen)"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Ajwain (Carom Seeds)"
      },
      {
        "amount": 4,
        "unit": "boiled",
        "name": "Potatoes (roughly crushed by hand)"
      },
      {
        "amount": 0.5,
        "unit": "cup",
        "name": "Boiled Green Peas"
      },
      {
        "amount": 1,
        "unit": "tbsp",
        "name": "Crushed Coriander Seeds & Saunf"
      },
      {
        "amount": 1,
        "unit": "tsp",
        "name": "Amchur (Dry Mango Powder)"
      }
    ],
    "steps": [
      "Rub ghee into maida until it resembles breadcrumbs and holds shape in your fist.",
      "Knead with ice-cold water into a stiff, tight dough; cover and rest for 25 minutes.",
      "Sauté whole spices, ginger, chilies, potatoes, and spices on low heat until aromatic and dry.",
      "Roll oval sheets, slice in half, form cones, stuff generously and seal with water.",
      "Fry in barely warm oil on low heat for the first 12 minutes, then medium heat until golden brown."
    ],
    "chefTip": "Never drop samosas in hot oil! Frying in lukewarm oil first cooks the crust evenly from within and eliminates unsightly bubbles."
  }
];

const ALL_VIDEOS = [
  {
    "id": "mJD_rrUFZjs",
    "title": "Repost | Simple & Tasty Rabdi Rice Kheer Recipe 🤌🏻🤤| Sharad Purnima Special ❤️ | VimShi Cooking",
    "thumbnail": "https://i.ytimg.com/vi/mJD_rrUFZjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAMj8GdwVTgDtSEFy_D-UJPq8Y33Q",
    "duration": "",
    "views": "54",
    "published": "2d ago",
    "url": "https://www.youtube.com/watch?v=mJD_rrUFZjs"
  },
  {
    "id": "yJtcttYs28s",
    "title": "Something Different from Paneer and Chole! Try This Delicious Besan Paneer Gravy Recipe 🤤🌯",
    "thumbnail": "https://i.ytimg.com/vi/yJtcttYs28s/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDxH5DdzQ6B7N5A0r1Q7hidfh3uHg",
    "duration": "",
    "views": "115",
    "published": "6d ago",
    "url": "https://www.youtube.com/watch?v=yJtcttYs28s"
  },
  {
    "id": "qZVNMxWMIn8",
    "title": "Try Something New This Diwali! 3 Unique Flavors of Malai Cham Cham | Vimshi Cooking Special",
    "thumbnail": "https://i.ytimg.com/vi/qZVNMxWMIn8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0aVPHj3rw2YgC-g6VSchsyvtCdQ",
    "duration": "",
    "views": "92",
    "published": "9d ago",
    "url": "https://www.youtube.com/watch?v=qZVNMxWMIn8"
  },
  {
    "id": "qv-MglA1plA",
    "title": "Healthy Dates & Walnut Mithai 🌰✨ | No Sugar, No Ghee, No Oil, No Butter | Vimshi Special Recipe 🌿",
    "thumbnail": "https://i.ytimg.com/vi/qv-MglA1plA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLApcaYhsWSu-dBQYFjcyQ9ANZ4Arg",
    "duration": "",
    "views": "129",
    "published": "12d ago",
    "url": "https://www.youtube.com/watch?v=qv-MglA1plA"
  },
  {
    "id": "t4KR_ib5rOc",
    "title": "Cafe-Style ☕ Korean Cheese Buns 🧀 At Home 🏠 (Super Cheesy 🧀 & Creamy! 😋)",
    "thumbnail": "https://i.ytimg.com/vi/t4KR_ib5rOc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDWOL0dt14orY0OSlWcNTb7u5xxXA",
    "duration": "",
    "views": "60",
    "published": "2w ago",
    "url": "https://www.youtube.com/watch?v=t4KR_ib5rOc"
  },
  {
    "id": "qCv8Y9NqX3g",
    "title": "VimShi’s Style Soya Chunk Curry in Black Gravy 😋 – A Texture So Good, Even Non-Veg Will Fail! | V...",
    "thumbnail": "https://i.ytimg.com/vi/qCv8Y9NqX3g/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD-Ye3J3xLZ7hSZ96xdBc9Gvx-sSw",
    "duration": "",
    "views": "250",
    "published": "2w ago",
    "url": "https://www.youtube.com/watch?v=qCv8Y9NqX3g"
  },
  {
    "id": "GnmeMHr_4LM",
    "title": "You’ll Forget Expensive Store-Bought Sweets! No Sugar No Jaggery 🚫🍯 Viral Date & Nut Bar 🌴🥜 | Vim...",
    "thumbnail": "https://i.ytimg.com/vi/GnmeMHr_4LM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCrPxX4BZMRBFb-qUMoxQNtHGOz0w",
    "duration": "",
    "views": "48",
    "published": "3w ago",
    "url": "https://www.youtube.com/watch?v=GnmeMHr_4LM"
  },
  {
    "id": "x947czC9kRk",
    "title": "Even Non-Bottle Gourd Lovers Will Lick Their Fingers Clean! 😋 Shahi Stuffed Lauki with Creamy Gravy",
    "thumbnail": "https://i.ytimg.com/vi/x947czC9kRk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCZ8ecNkeWGMT81llfMxxkLISEZ_w",
    "duration": "",
    "views": "110",
    "published": "3w ago",
    "url": "https://www.youtube.com/watch?v=x947czC9kRk"
  },
  {
    "id": "9tIEKNVhYWg",
    "title": "3-Min ZERO OIL Innovative Crispy Lauki Dosa! 🥒⚡ High Protein & Weight Loss Breakfast by VimShi.",
    "thumbnail": "https://i.ytimg.com/vi/9tIEKNVhYWg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB2Icmygb8tKRmkQ8B1_Hi13wVskg",
    "duration": "",
    "views": "80",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=9tIEKNVhYWg"
  },
  {
    "id": "vuorZDbMCQg",
    "title": "🌺 VimShi’s Signature Rasmalai Modak Cake | Ganesh Utsav Special Design with Easy Tips & Tricks! 🐘✨",
    "thumbnail": "https://i.ytimg.com/vi/vuorZDbMCQg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAA00Hr965_VVSExi9gUz6uBLN6PQ",
    "duration": "",
    "views": "58",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=vuorZDbMCQg"
  },
  {
    "id": "-kc5Z6ffXbY",
    "title": "Tangy Karonda and Chili Pickle | Vimshi’s Style No-Preservative Pickle Recipe 🌶️",
    "thumbnail": "https://i.ytimg.com/vi/-kc5Z6ffXbY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBGdSDW-rommWsCAflkZiScp5j4lQ",
    "duration": "",
    "views": "70",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=-kc5Z6ffXbY"
  },
  {
    "id": "_forqQBt7wk",
    "title": "VimShi's No-Bake Savory Sandwich Cake with 3 Delicious Fillings | Swedish Smörgåstårta Recipe",
    "thumbnail": "https://i.ytimg.com/vi/_forqQBt7wk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAj5j-P5hrK8fYUbQcXok9ioLeDDA",
    "duration": "",
    "views": "51",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=_forqQBt7wk"
  },
  {
    "id": "ayD12XX-9aE",
    "title": "🫖 Make Market-Style Monaco Biscuits at Home! 🤤 | Crispy Salted Crackers Recipe ✨",
    "thumbnail": "https://i.ytimg.com/vi/ayD12XX-9aE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClAFgAGKGG960VKBnrIE6lGOr98A",
    "duration": "",
    "views": "159",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=ayD12XX-9aE"
  },
  {
    "id": "WWXL-K5UIR0",
    "title": "Most Unique VimShi's Innovation Krishna Chhati Cake Idea ✨ Secret Pineapple Flavor Kanha Janm Cake",
    "thumbnail": "https://i.ytimg.com/vi/WWXL-K5UIR0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBrcEX5lhwzCX4ZneKzEdrA6PyL2Q",
    "duration": "",
    "views": "77",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=WWXL-K5UIR0"
  },
  {
    "id": "pEn5kX290Hs",
    "title": "✨ Krishna Janmashtami Special | Mewa Paak & Panch Panjeeri Bhog Prasad | Divine Sweets for Kanha Ji",
    "thumbnail": "https://i.ytimg.com/vi/pEn5kX290Hs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9I24YpCCm8viH3qTOIPbsn2Sj2g",
    "duration": "",
    "views": "390",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=pEn5kX290Hs"
  },
  {
    "id": "WKg2o5VT4lU",
    "title": "🥮 100% No-Fail Gulab Jamun Cake | Soft, Juicy & Spongy Fusion Dessert 🍯🔥 | Vimshi Cooking",
    "thumbnail": "https://i.ytimg.com/vi/WKg2o5VT4lU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCCgYyLlKchVXUwo-TUIt3eoVdwrQ",
    "duration": "",
    "views": "150",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=WKg2o5VT4lU"
  },
  {
    "id": "1qP5V28-9iE",
    "title": "Raksha Bandhan Special Crispy Juicy Jalebi in Just 15 Minutes | Halwai Secret Crispy Jalebi Recipe",
    "thumbnail": "https://i.ytimg.com/vi/1qP5V28-9iE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAho0WCZl59R7OXl2GItcqMlYithw",
    "duration": "",
    "views": "161",
    "published": "1mo ago",
    "url": "https://www.youtube.com/watch?v=1qP5V28-9iE"
  },
  {
    "id": "uIzrOxBB6BM",
    "title": "Authentic Himachali Siddu at Home! 🥟 Super Soft, Healthy & Steamed (No Fail Recipe) 🔥🧈",
    "thumbnail": "https://i.ytimg.com/vi/uIzrOxBB6BM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB395wC8bevtBpR5Q9Uc2TFqoW1tg",
    "duration": "",
    "views": "76",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=uIzrOxBB6BM"
  },
  {
    "id": "wRupIoH1WPs",
    "title": "Bakery Style Ajwain Cookies | No Oven & Butter! ☕🍪 Sweet-Salty Crispy Biscuits | The Perfect Tea ...",
    "thumbnail": "https://i.ytimg.com/vi/wRupIoH1WPs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCMpws1m4azdv4wif8nxhfEJ3mNdg",
    "duration": "",
    "views": "56",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=wRupIoH1WPs"
  },
  {
    "id": "uX2FO4yohKw",
    "title": "Rakshabandhan Special 🌸 Bakery-Style Eggless Fudgy Brownies Recipe😋| Shiny Crinkle Top Walnut Bro...",
    "thumbnail": "https://i.ytimg.com/vi/uX2FO4yohKw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0qnVCRjSZZSZYAFtprsMsDl9_wg",
    "duration": "",
    "views": "107",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=uX2FO4yohKw"
  },
  {
    "id": "YCPebfzVX8I",
    "title": "इस 15 अगस्त बनाएं तिरंगा Fusion Recipe! 🇮🇳 Tasty, Healthy & Innovative Dish | VimShi Special",
    "thumbnail": "https://i.ytimg.com/vi/YCPebfzVX8I/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA1fanQLoB8ZHr0BImTZctGgXyDog",
    "duration": "",
    "views": "93",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=YCPebfzVX8I"
  },
  {
    "id": "oWLZbdlxfg4",
    "title": "Low Oil, High Protein Paneer Korma Recipe with Degi Mirch 😋 | VimShi Cooking",
    "thumbnail": "https://i.ytimg.com/vi/oWLZbdlxfg4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDmYV0MwNzwbsQ8uf9TJ7kd3kknxQ",
    "duration": "",
    "views": "46",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=oWLZbdlxfg4"
  },
  {
    "id": "BR26H_LHJ50",
    "title": "Market-Style Thick & Creamy Oreo Ice Cream | Easy 5-Minute Recipe by VimShi",
    "thumbnail": "https://i.ytimg.com/vi/BR26H_LHJ50/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBb-H74VDYBaYe0SF3-xzlPRqWPTw",
    "duration": "",
    "views": "40",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=BR26H_LHJ50"
  },
  {
    "id": "UJheF6cSbW0",
    "title": "High Protein Idli Chaach Recipe 🥛✨ | Healthy & Refreshing Summer Drink ☀️ | VimShi Cooking",
    "thumbnail": "https://i.ytimg.com/vi/UJheF6cSbW0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCI3wxHdCYBx_GG1Pa6bAV7aPUNkw",
    "duration": "",
    "views": "73",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=UJheF6cSbW0"
  },
  {
    "id": "Lv-sFtYm-GU",
    "title": "Forget Regular Raita! 💥 Try This Roasted Corn Raita with Delicious Veg Biryani",
    "thumbnail": "https://i.ytimg.com/vi/Lv-sFtYm-GU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYLeqDVcZzRwtC5DCFV-Hlm3k7Nw",
    "duration": "",
    "views": "82",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=Lv-sFtYm-GU"
  },
  {
    "id": "zXYollHRbGw",
    "title": "Chatpati South Indian Podi Masala | Authentic Gunpowder / Milagai Podi Recipe 😋",
    "thumbnail": "https://i.ytimg.com/vi/zXYollHRbGw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCxIbY1aEpPUeWE479_KnUFyqIVrg",
    "duration": "",
    "views": "50",
    "published": "2mo ago",
    "url": "https://www.youtube.com/watch?v=zXYollHRbGw"
  },
  {
    "id": "upTZTrVmeJE",
    "title": "Innovative Jumbo Cucumber Idli | No Oil, Super Fluffy & Refreshing Recipe! 😋 | VIMSHI COOKING",
    "thumbnail": "https://i.ytimg.com/vi/upTZTrVmeJE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA60k1KIDL8oQIvBr3HVwdHt74W8g",
    "duration": "",
    "views": "40",
    "published": "3mo ago",
    "url": "https://www.youtube.com/watch?v=upTZTrVmeJE"
  },
  {
    "id": "-MhsMOUccGo",
    "title": "Sawan Special: Crispy & Juicy Ghevar Recipe Without Gram Flour! 100% Fool-Proof Magic Trick 💥",
    "thumbnail": "https://i.ytimg.com/vi/-MhsMOUccGo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDOl-eiC7ph0Ju7sJjBPzodgmMqLA",
    "duration": "",
    "views": "149",
    "published": "3mo ago",
    "url": "https://www.youtube.com/watch?v=-MhsMOUccGo"
  },
  {
    "id": "O02Ts3o-jbo",
    "title": "Such a Soft and Spongy Breakfast Without Oil! 🍅 VimShi's Special Tomato Appam Recipe | No Oil Bre...",
    "thumbnail": "https://i.ytimg.com/vi/O02Ts3o-jbo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAVOfT4nezn6WUAE0Yc7mIR_x_9OQ",
    "duration": "",
    "views": "69",
    "published": "3mo ago",
    "url": "https://www.youtube.com/watch?v=O02Ts3o-jbo"
  },
  {
    "id": "Dzu1v6-QNBA",
    "title": "Halwai-Style Samosa Secrets Revealed! 🌧️ Vimshi's Monsoon Special Crispy Samosa Recipe",
    "thumbnail": "https://i.ytimg.com/vi/Dzu1v6-QNBA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC_sE6BRNUA-k9UjgYzqiVNxE1NCA",
    "duration": "",
    "views": "91",
    "published": "3mo ago",
    "url": "https://www.youtube.com/watch?v=Dzu1v6-QNBA"
  }
];
