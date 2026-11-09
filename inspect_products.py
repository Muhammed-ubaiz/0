import re
import json

with open('scraped/collections_all.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find product links
# Shopify product links are usually /products/<handle>
product_links = set(re.findall(r'href="(/products/[^"?#]+)', html))
print(f'Total product links found on page 1 of collections/all: {len(product_links)}')
for p in list(product_links)[:10]:
    print(' ', p)

# Check pagination
pagination = re.findall(r'href="(/collections/all\?page=\d+)"', html)
print('Pagination links:', set(pagination))

# Let's extract product cards: title, price, image
# Look for product card patterns in Shopify themes (Dawn or custom theme)
cards = re.findall(r'<li[^>]*class="[^"]*grid__item[^"]*"[^>]*>(.*?)</li>', html, re.DOTALL)
print(f'Grid items count: {len(cards)}')

if cards:
    sample_card = cards[0]
    print('Sample card length:', len(sample_card))
    # Extract title
    title = re.search(r'<h3[^>]*>.*?<a[^>]*>(.*?)</a>', sample_card, re.DOTALL)
    print('Sample title:', title.group(1).strip() if title else 'None')
    # Extract price
    price = re.search(r'class="price-item price-item--regular"[^>]*>(.*?)</span>', sample_card, re.DOTALL)
    print('Sample price:', price.group(1).strip() if price else 'None')
    # Extract img
    img = re.search(r'<img[^>]+src="([^"]+)"', sample_card)
    print('Sample img:', img.group(1) if img else 'None')
