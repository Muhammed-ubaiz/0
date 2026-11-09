import re
import json

with open('scraped/homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find JSON-LD scripts (schema.org)
json_lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
print(f'JSON-LD count: {len(json_lds)}')
for i, jld in enumerate(json_lds):
    try:
        data = json.loads(jld)
        print(f'JSON-LD #{i}:', json.dumps(data, indent=2)[:500])
    except Exception as e:
        print(f'JSON-LD #{i} error: {e}')

# Look for text in announcement bar
announcement = re.findall(r'class="[^"]*announcement[^"]*"[^>]*>(.*?)</div>', html, re.DOTALL | re.IGNORECASE)
print('Announcements:', [re.sub(r'<[^>]+>', ' ', a).strip() for a in announcement][:5])

# Find headings
headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', html, re.DOTALL | re.IGNORECASE)
cleaned_headings = [re.sub(r'<[^>]+>', ' ', h).strip() for h in headings if re.sub(r'<[^>]+>', ' ', h).strip()]
print('\nHeadings on homepage:')
for h in cleaned_headings:
    print('  -', h)

# Social links
social = re.findall(r'href="(https?://(?:www\.)?(?:instagram|facebook|twitter|tiktok|linkedin|youtube|pinterest|wa\.me|whatsapp)[^"]+)"', html, re.IGNORECASE)
print('\nSocial links:', set(social))
