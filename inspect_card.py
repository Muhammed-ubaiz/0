with open('scraped/collections_all.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
cards = re.findall(r'<li[^>]*class="[^"]*grid__item[^"]*"[^>]*>(.*?)</li>', html, re.DOTALL)
print('Found', len(cards), 'cards')
if cards:
    # Print the first card text (strip out huge svgs if needed)
    c = cards[0]
    # find all links in this card
    links = re.findall(r'href="([^"]+)"', c)
    print('Links in card:', links)
    
    # find images in card
    imgs = re.findall(r'<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"', c)
    print('Imgs with alt:', imgs[:3])
    
    # print non-tag text of card
    text = re.sub(r'<[^>]+>', ' ', c)
    text = ' '.join(text.split())
    print('Clean card text:', text[:300])
