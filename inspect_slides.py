import re

with open('scraped/homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Search for banner/hero images with larger dimensions or in slideshow
hero_blocks = re.findall(r'<div[^>]*class="[^"]*(?:slideshow|banner|hero)[^"]*"[^>]*>(.*?)</div>', html, re.DOTALL)
print(f'Found {len(hero_blocks)} hero/slideshow/banner blocks')

# Check all images that are in files/
file_imgs = re.findall(r'//idealpackstore\.com/cdn/shop/files/([^"?]+)', html)
print("Unique image filenames on homepage:", len(set(file_imgs)))
for img in sorted(list(set(file_imgs))):
    print(" ", img)
