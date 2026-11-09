import urllib.request
import re
import json
import time
import os
import scraper_helper

os.makedirs('scraped', exist_ok=True)

# 1. Main categories identified from Ideal Pack site
CATEGORIES = [
    {
        "id": "aluminium-products",
        "name": "Aluminium Containers",
        "handle": "aluminium-products",
        "image": "https://cdn.shopify.com/s/files/1/0978/4895/1101/collections/2149182215.jpg?v=1771836239",
        "description": "High-grade aluminium containers, foil rolls, oval platters, and rectangular pots with lids."
    },
    {
        "id": "black-base-containers",
        "name": "Black Base Containers",
        "handle": "black-base-containers",
        "image": "https://cdn.shopify.com/s/files/1/0978/4895/1101/collections/blank-container.jpg?v=1771836442",
        "description": "Microwave-safe heavy duty black base food containers, bowls, and sushi trays."
    },
    {
        "id": "cleaning-tools",
        "name": "Cleaning Tools",
        "handle": "cleaning-tools",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Professional cleaning accessories, microfiber towels, dusters, and supplies."
    },
    {
        "id": "clear-containers",
        "name": "Clear Containers",
        "handle": "clear-containers",
        "image": "https://idealpackstore.com/cdn/shop/files/61oX-dJR8UL._AC_SX466__with_bgc.png?format=webp",
        "description": "Transparent food containers, airtight glass jars, dessert cups, and storage containers."
    },
    {
        "id": "eco-friendly-products",
        "name": "Eco-Friendly Products",
        "handle": "eco-friendly-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Biodegradable, compostable paper, bagasse tableware, bamboo cutlery, and green packaging."
    },
    {
        "id": "foam-products",
        "name": "Foam Products",
        "handle": "foam-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Insulated foam cups, plates, and takeout packaging for hot and cold foods."
    },
    {
        "id": "ideal-care-products",
        "name": "Ideal Care Products",
        "handle": "ideal-care-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Hygiene and safety goods including powder-free nitrile gloves and protective wear."
    },
    {
        "id": "kraft-products",
        "name": "Kraft Products",
        "handle": "kraft-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Kraft ripple cups, salad bowls, burger boxes, sandwich wedges, and takeout boxes."
    },
    {
        "id": "paper-products",
        "name": "Paper Products",
        "handle": "paper-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Paper cups, plates, napkins, baking paper, and catering paper goods."
    },
    {
        "id": "plastic-products",
        "name": "Plastic Products",
        "handle": "plastic-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Plastic cups, sauce dispensers, storage bottles, dining cutlery, and portion pots."
    },
    {
        "id": "plastic-roll-bags",
        "name": "Plastic Roll & Bags",
        "handle": "plastic-roll-bags",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Food cling wrap rolls, heavy-duty garbage bags, vacuum bags, and shopping bags."
    },
    {
        "id": "tissue-products",
        "name": "Tissue Products",
        "handle": "tissue-products",
        "image": "https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png",
        "description": "Maxi rolls, premium facial tissues, napkins, and commercial paper rolls."
    }
]

print("Starting product scraping across 16 pages...")
all_products = []
seen_handles = set()

# First include page 1 from already saved file if available
if os.path.exists('scraped/collections_all.html'):
    with open('scraped/collections_all.html', 'r', encoding='utf-8') as f:
        p1 = scraper_helper.parse_products_from_page(f.read())
        for p in p1:
            if p['handle'] not in seen_handles:
                seen_handles.add(p['handle'])
                all_products.append(p)
    print(f"Page 1 loaded from cache: {len(all_products)} products.")

# Fetch pages 2 through 16
for page in range(2, 17):
    url = f"https://idealpackstore.com/collections/all?page={page}"
    print(f"Fetching page {page}/16...")
    html = scraper_helper.fetch_url(url)
    if html:
        products = scraper_helper.parse_products_from_page(html)
        print(f"  Page {page} gave {len(products)} products.")
        for p in products:
            if p['handle'] not in seen_handles:
                seen_handles.add(p['handle'])
                all_products.append(p)
    else:
        print(f"  Failed page {page}")
    time.sleep(0.5)

print(f"\nScraping complete! Total unique products scraped: {len(all_products)}")

# Enhance product categorization by matching title keywords to categories
for p in all_products:
    t = p['title'].lower()
    matched_cat = "plastic-products"
    if "aluminium" in t or "aluminum" in t or "foil" in t or "platter" in t:
        matched_cat = "aluminium-products"
    elif "black base" in t or "black" in t and "container" in t:
        matched_cat = "black-base-containers"
    elif "clean" in t or "mop" in t or "towel" in t or "duster" in t:
        matched_cat = "cleaning-tools"
    elif "clear" in t or "jar" in t or "glass" in t or "storage container" in t:
        matched_cat = "clear-containers"
    elif "bio" in t or "eco" in t or "bamboo" in t or "compost" in t or "wooden" in t:
        matched_cat = "eco-friendly-products"
    elif "foam" in t:
        matched_cat = "foam-products"
    elif "glove" in t or "mask" in t or "care" in t or "hygiene" in t:
        matched_cat = "ideal-care-products"
    elif "kraft" in t or "burger box" in t or "ripple" in t:
        matched_cat = "kraft-products"
    elif "paper" in t or "straw" in t:
        matched_cat = "paper-products"
    elif "tissue" in t or "roll" in t and "maxi" in t or "napkin" in t:
        matched_cat = "tissue-products"
    elif "bag" in t or "garbage" in t or "cling" in t or "wrap" in t:
        matched_cat = "plastic-roll-bags"
    elif "bottle" in t or "cup" in t or "plastic" in t or "plate" in t or "sauce" in t:
        matched_cat = "plastic-products"

    p['category'] = matched_cat
    p['in_stock'] = True
    p['rating'] = 4.8
    p['reviews_count'] = 12
    p['sku'] = f"IP-{p['handle'][:8].upper()}"
    p['description'] = f"{p['title']}. Premium food-grade packaging solution by Ideal Pack, designed for restaurants, catering, cafes, and household food storage across UAE."

# Save products
with open('scraped/products.json', 'w', encoding='utf-8') as f:
    json.dump(all_products, f, indent=2, ensure_ascii=False)

# Save categories with product counts
cat_counts = {}
for p in all_products:
    cat = p.get('category', 'other')
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

for c in CATEGORIES:
    c['products_count'] = cat_counts.get(c['id'], 0)
    # Give it a good representative image from the category products if available
    cat_prods = [p for p in all_products if p.get('category') == c['id'] and p.get('images')]
    if cat_prods:
        c['image'] = cat_prods[0]['images'][0]

with open('scraped/categories.json', 'w', encoding='utf-8') as f:
    json.dump(CATEGORIES, f, indent=2, ensure_ascii=False)

print("Saved scraped/products.json and scraped/categories.json successfully.")
