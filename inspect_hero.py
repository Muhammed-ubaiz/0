import re

with open('scraped/homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find slides or slideshow
slides = re.findall(r'<div[^>]*class="[^"]*slideshow[^"]*"[^>]*>(.*?)</div>\s*</div>', html, re.DOTALL)
print('Slideshow blocks found:', len(slides))

# Find hero images / banners
banners = re.findall(r'<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"', html)
hero_banners = [b for b in banners if 'banner' in b[0].lower() or 'slide' in b[0].lower() or 'hero' in b[0].lower()]
print('Hero banners count:', len(hero_banners))
for b in hero_banners[:5]:
    print(' ', b)

# If no specific banner keyword, check all large images on homepage
print('\nTop images on homepage:')
for src, alt in banners[:15]:
    clean_src = src.replace('&amp;', '&')
    if 'logo' in clean_src.lower() or 'banner' in clean_src.lower() or 'files' in clean_src.lower():
        print(f"  Alt: {alt} -> {clean_src}")
