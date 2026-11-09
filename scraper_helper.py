import urllib.request
import re
import json
import time
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

def fetch_url(url, retries=3):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15) as res:
                return res.read().decode('utf-8')
        except Exception as e:
            print(f"Error fetching {url} (attempt {i+1}): {e}")
            time.sleep(2)
    return None

def parse_products_from_page(html):
    products = []
    # Find grid item li's
    cards = re.findall(r'<li[^>]*class="[^"]*grid__item[^"]*"[^>]*>(.*?)</li>', html, re.DOTALL)
    for c in cards:
        # Title and URL
        # Link usually: /collections/all/products/<handle>
        url_m = re.search(r'href="(/collections/[^/]+/products/([^"?#]+)|/products/([^"?#]+))"', c)
        if not url_m:
            continue
        handle = url_m.group(2) or url_m.group(3)
        url = f"/products/{handle}"
        
        # Images
        imgs = re.findall(r'<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"', c)
        image_urls = []
        for src, alt in imgs:
            clean_src = src.replace('&amp;', '&')
            if clean_src.startswith('//'):
                clean_src = 'https:' + clean_src
            # Extract high-res image url by removing width parameters if any
            clean_src = re.sub(r'&width=\d+', '', clean_src)
            clean_src = re.sub(r'\?width=\d+&', '?', clean_src)
            if clean_src not in image_urls:
                image_urls.append(clean_src)
                
        # Title from alt or heading
        title = ""
        title_m = re.search(r'<h3[^>]*class="[^"]*card__heading[^"]*"[^>]*>(.*?)</h3>', c, re.DOTALL)
        if title_m:
            title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip()
        if not title and imgs and imgs[0][1]:
            title = imgs[0][1].replace('Main image', '').replace('Secondary image', '').strip(', ')
        if not title:
            title = handle.replace('-', ' ').title()
            
        # Price
        # Look for price regular
        price = 0.0
        price_m = re.search(r'class="price-item price-item--regular"[^>]*>(.*?)</span>', c, re.DOTALL)
        if price_m:
            price_text = re.sub(r'<[^>]+>', ' ', price_m.group(1))
            num_m = re.search(r'(\d+(?:\.\d{1,2})?)', price_text)
            if num_m:
                price = float(num_m.group(1))
                
        # Compare at / original price
        compare_at_price = None
        compare_m = re.search(r'class="price-item price-item--sale"[^>]*>(.*?)</span>', c, re.DOTALL)
        if compare_m:
            num_m = re.search(r'(\d+(?:\.\d{1,2})?)', re.sub(r'<[^>]+>', ' ', compare_m.group(1)))
            if num_m:
                compare_at_price = float(num_m.group(1))

        # Check badges (e.g. Sale, Sold out)
        badge = None
        if 'badge--bottom-left' in c or 'card__badge' in c:
            badge_m = re.search(r'class="badge[^"]*"[^>]*>(.*?)</span>', c, re.DOTALL)
            if badge_m:
                badge = re.sub(r'<[^>]+>', '', badge_m.group(1)).strip()

        # Vendor
        vendor = "Ideal Pack"
        vendor_m = re.search(r'class="caption-with-letter-spacing[^"]*"[^>]*>(.*?)</div>', c, re.DOTALL)
        if vendor_m:
            v_clean = re.sub(r'<[^>]+>', '', vendor_m.group(1)).strip()
            if v_clean:
                vendor = v_clean

        products.append({
            'id': handle,
            'handle': handle,
            'title': title,
            'price': price if price > 0 else 15.00,
            'compare_at_price': compare_at_price,
            'images': image_urls if image_urls else ['https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png'],
            'image': image_urls[0] if image_urls else 'https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png',
            'badge': badge,
            'vendor': vendor,
            'currency': 'AED'
        })
    return products

print("Scraper module ready.")
