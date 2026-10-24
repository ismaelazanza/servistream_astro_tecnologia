import type { APIRoute } from 'astro';
import metadata from '../data/seo.json';
import { blogPosts } from '../data/blog';
export const GET: APIRoute = () => {
  const urls = [...Object.keys(metadata), ...blogPosts.map((post) => `/blog/${post.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>https://servistream.net${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
