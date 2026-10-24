from pathlib import Path
from html.parser import HTMLParser
import json,collections,urllib.parse
class Page(HTMLParser):
 def __init__(self):super().__init__();self.title='';self.h1=[];self.h2=[];self.links=[];self.images=[];self.meta={};self.canonical='';self.capture=None;self.schemas=[];self.data='';self.ids=set()
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if t in ['title','h1','h2']:self.capture=t;self.data=''
  if t=='a':self.links.append(a.get('href',''))
  if t=='img':self.images.append(a)
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
  if t=='script' and a.get('type')=='application/ld+json':self.capture='schema';self.data=''
 def handle_data(self,d):
  if self.capture:self.data+=d
 def handle_endtag(self,t):
  if t==self.capture or (t=='script' and self.capture=='schema'):
   if self.capture=='title':self.title=self.data.strip()
   elif self.capture=='schema':
    try:self.schemas.append(json.loads(self.data))
    except: self.schemas.append({'error':'invalid JSON'})
   else:getattr(self,self.capture).append(' '.join(self.data.split()))
   self.capture=None
pages={}
for p in Path('dist').rglob('*.html'):
 url='/'+str(p.relative_to('dist')).replace('index.html','').removesuffix('.html').rstrip('/')
 if not url:url='/'
 page=Page();page.feed(p.read_text());pages[url]=page
rows=[]
for url,p in sorted(pages.items()):
 broken=[]
 for link in p.links:
  if link.startswith('/') and not link.startswith('//'):
   path=urllib.parse.urlsplit(link).path.rstrip('/') or '/'
   if path not in pages and not (Path('public')/path.lstrip('/')).exists():broken.append(link)
 fragments=[]
 for link in p.links:
  parsed=urllib.parse.urlsplit(link)
  if parsed.scheme or parsed.netloc or not parsed.fragment:continue
  target=parsed.path.rstrip('/') or (url if not parsed.path else '/')
  if target in pages and urllib.parse.unquote(parsed.fragment) not in pages[target].ids:fragments.append(link)
 rows.append(dict(broken_fragments=sorted(set(fragments)),url=url,title=p.title,description=p.meta.get('description',''),h1=p.h1,h2=p.h2,canonical=p.canonical,robots=p.meta.get('robots',''),schemas=p.schemas,broken_links=sorted(set(broken)),images=p.images,og=p.meta.get('og:image','')))
Path('reports/seo-audit.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
for r in rows:print(r['url'], 'H1:',len(r['h1']), 'canonical:',bool(r['canonical']), 'broken:',r['broken_links'])
