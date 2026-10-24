"""Validate the built site: metadata, crawlable links, images, JSON-LD and sitemap."""
from pathlib import Path
import json,collections,xml.etree.ElementTree as ET
rows=json.loads(Path('reports/seo-audit.json').read_text())
index=[r for r in rows if not r['robots'].startswith('noindex')]
errors=[]
for r in rows:
 if len(r['h1'])!=1:errors.append([r['url'],'H1 count',len(r['h1'])])
 if not r['canonical'].startswith('https://servistream.net'):errors.append([r['url'],'canonical'])
 if r['broken_links']:errors.append([r['url'],'broken routes',r['broken_links']])
 if r['broken_fragments']:errors.append([r['url'],'broken fragments',r['broken_fragments']])
 if not r['schemas'] or any('error' in v for v in r['schemas']):errors.append([r['url'],'invalid JSON-LD'])
 if not r['og'] or not (Path('public')/r['og'].replace('https://servistream.net/','')).is_file():errors.append([r['url'],'missing social image'])
 for a in r['images']:
  if not a.get('width') or not a.get('height'):errors.append([r['url'],'image dimensions',a.get('src')])
  if 'alt' not in a:errors.append([r['url'],'image alt',a.get('src')])
  if a.get('src','').startswith('/') and not (Path('public')/a['src'].lstrip('/')).is_file():errors.append([r['url'],'missing image',a['src']])
for field in ['title','description','canonical']:
 for value,n in collections.Counter(r[field] for r in rows).items():
  if n>1:errors.append([field,'duplicate',value])
xml=ET.parse('dist/sitemap.xml')
urls=[e.text for e in xml.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
if set(urls)!=set(r['canonical'] for r in index):errors.append(['sitemap','canonical mismatch'])
if len(urls)!=len(set(urls)):errors.append(['sitemap','duplicates'])
if 'Sitemap: https://servistream.net/sitemap.xml' not in Path('dist/robots.txt').read_text():errors.append(['robots','missing sitemap'])
result={'pages':len(rows),'indexable':len(index),'sitemap_urls':len(urls),'errors':errors}
Path('reports/seo-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result,ensure_ascii=False))
raise SystemExit(bool(errors))
