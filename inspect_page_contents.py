import re
import os

for f in ['contact.html', 'store-locator.html', 'customization.html', 'wholesale.html']:
    path = os.path.join('scraped/pages', f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            html = file.read()
        # Find main content
        main = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
        content = main.group(1) if main else html
        # strip scripts and styles
        content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
        content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL)
        text = re.sub(r'<[^>]+>', ' ', content)
        text = ' '.join(text.split())
        print(f"=== {f} ===")
        print(text[:400])
        print()
