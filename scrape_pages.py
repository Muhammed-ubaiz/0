import urllib.request
import re
import json
import os
import scraper_helper

PAGES = [
    ('customization', 'https://idealpackstore.com/pages/customization'),
    ('wholesale', 'https://idealpackstore.com/pages/wholesale'),
    ('store-locator', 'https://idealpackstore.com/pages/store-locator'),
    ('contact', 'https://idealpackstore.com/pages/contact'),
]

os.makedirs('scraped/pages', exist_ok=True)

for name, url in PAGES:
    print(f"Fetching {name}...")
    html = scraper_helper.fetch_url(url)
    if html:
        with open(f"scraped/pages/{name}.html", 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Saved {name}.html ({len(html)} bytes)")

print("All static pages fetched.")
