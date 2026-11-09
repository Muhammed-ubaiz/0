import re

with open('scraped/homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

font_links = re.findall(r'https?://fonts\.[^\"]+', html)
print('Google Fonts:', font_links)

# Check typography rules
styles = re.findall(r'--font-[a-zA-Z0-9_-]+:\s*([^;]+);', html)
print('CSS font variables in original theme:', set(styles))

# Check font-family declarations
families = re.findall(r'font-family:\s*([^;}]+)', html)
print('Font families declared in original:', set(families[:10]))
