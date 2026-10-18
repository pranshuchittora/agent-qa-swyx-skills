import { mkdir, writeFile, cp } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { escapeHtml as h, renderPost } from './headings.js';

// Replace these examples with the site's existing content model. All content
// here is trusted source material; sanitize Markdown if authors are untrusted.
const site = 'Engineering notes';
const origin = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');
const posts = [
  { slug: 'finding-a-stutter', title: 'Finding a stutter', description: 'How one measurement changed our diagnosis.', date: '2026-01-02', related: ['measuring-a-frame'], body: 'A short example post. Replace it with your own evidence.\n\n## The visible symptom\n\nA frame occasionally took longer than expected.\n\n## A better measurement {#measurement}\n\nWe measured each stage separately.' },
  { slug: 'measuring-a-frame', title: 'Measuring a frame', description: 'A practical starting point for timing an interactive app.', date: '2026-01-01', related: ['finding-a-stutter'], body: 'Start with the user-visible result.\n\n## The first clock\n\nA single average hides individual slow frames.\n\n## What to record\n\nKeep timestamps with the surrounding context.' }
];
const dist = 'dist';
const url = (path: string) => new URL(path, origin).href;
const rendered = await Promise.all(posts.map(async post => ({ ...post, ...await renderPost(post.body, ['related-reading']) })));
if (new Set(posts.map(p => p.slug)).size !== posts.length || posts.some(p => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))) throw new Error('Invalid or duplicate slug');
for (const post of rendered) {
  if (new Set(post.related).size !== post.related.length || post.related.some(id => id === post.slug || !posts.some(p => p.slug === id))) throw new Error(`Invalid related links for ${post.slug}`);
}
await mkdir(join(dist, 'social'), { recursive: true });
await cp('public', dist, { recursive: true });

async function card(slug: string, title: string) {
  // A deliberately plain, portable template. Replace with project-specific
  // imagery when it adds meaning; inspect long titles at preview size.
  const words = title.split(/\s+/); const lines: string[] = [];
  for (const word of words) {
    if ([...word].length > 16) throw new Error(`Social-card word needs a custom layout: ${word}`);
    const line = lines.at(-1);
    if (!line || [...`${line} ${word}`].length > 16) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  if (lines.length > 4) throw new Error(`Social-card title needs a custom layout: ${title}`);
  if ([...site].length > 30 || new URL(origin).host.length > 40) throw new Error('Social-card site name or host needs a custom layout');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#132a32"/><rect x="56" y="56" width="10" height="518" fill="#f9b96f"/><text x="96" y="125" font-family="sans-serif" font-size="28" font-weight="bold" fill="#f9b96f">${h(site.toUpperCase())}</text>${lines.map((line, i) => `<text x="96" y="${240 + i * 76}" font-family="sans-serif" font-size="64" font-weight="bold" fill="#f8f7ee">${h(line)}</text>`).join('')}<text x="96" y="560" font-family="sans-serif" font-size="24" fill="#d3e3dd">${h(new URL(origin).host)}</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(join(dist, 'social', `${slug}.png`));
}
function page(title: string, description: string, path: string, image: string, body: string, type: 'article' | 'website') {
  const canonical = url(path); const imageUrl = url(`/social/${image}.png`); const fullTitle = title === site ? site : `${title} · ${site}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${h(fullTitle)}</title><meta name="description" content="${h(description)}"><link rel="canonical" href="${h(canonical)}"><meta property="og:type" content="${type}"><meta property="og:title" content="${h(fullTitle)}"><meta property="og:description" content="${h(description)}"><meta property="og:url" content="${h(canonical)}"><meta property="og:image" content="${h(imageUrl)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${h(fullTitle)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${h(fullTitle)}"><meta name="twitter:description" content="${h(description)}"><meta name="twitter:image" content="${h(imageUrl)}"><meta name="twitter:image:alt" content="${h(fullTitle)}"><link rel="stylesheet" href="/blog.css"><script src="/blog.js" defer></script></head><body><header class="site-header"><a href="/blog/">${h(site)}</a></header><main class="page">${body}</main></body></html>`;
}
async function output(path: string, html: string) {
  const dir = join(dist, path); await mkdir(dir, { recursive: true }); await writeFile(join(dir, 'index.html'), html);
}
for (const post of rendered) {
  await card(post.slug, post.title);
  const rail = rendered.map(p => `<a href="/blog/${p.slug}/"${p.slug === post.slug ? ' aria-current="page"' : ''}>${h(p.title)}</a>`).join('');
  const toc = post.headings.filter(x => x.depth === 2 || x.depth === 3).map(x => `<li class="toc-level-${x.depth}"><a href="#${encodeURIComponent(x.id)}">${h(x.title)}</a></li>`).join('');
  const related = post.related.map(slug => { const p = rendered.find(x => x.slug === slug)!; return `<li><a href="/blog/${p.slug}/"><strong>${h(p.title)}</strong><span>${h(p.description)}</span></a></li>`; }).join('');
  const body = `<div class="post-layout"><aside class="index-rail" aria-label="Blog index"><div class="rail-header"><a href="/blog/">All posts</a><button class="rail-toggle" type="button" aria-label="Minimize blog index">×</button></div><nav class="rail-links" aria-label="Posts">${rail}</nav><div class="rail-resize" role="separator" tabindex="0" aria-label="Resize blog index" aria-orientation="vertical" aria-valuemin="200" aria-valuemax="380" aria-valuenow="250"></div></aside><button class="rail-restore" type="button" aria-label="Restore blog index">☰</button><article class="post"><a class="post-back" href="/blog/">← All posts</a><header><h1>${h(post.title)}</h1><p>${h(post.description)}</p><p><time datetime="${post.date}">${post.date}</time> · ${post.minutes} min read</p></header><div class="article">${post.html}${related ? `<section class="related" aria-labelledby="related-reading"><h2 id="related-reading">Related reading<a class="heading-link" href="#related-reading" aria-label="Link to Related reading">#</a></h2><ul>${related}</ul></section>` : ''}</div></article>${toc ? `<aside class="toc" aria-label="On this page"><details><summary>On this page</summary><nav aria-label="Article sections"><ol>${toc}</ol></nav></details></aside>` : ''}</div>`;
  await output(`blog/${post.slug}`, page(post.title, post.description, `/blog/${post.slug}/`, post.slug, body, 'article'));
}
await card('index', 'Engineering notes');
const rows = rendered.map(p => `<a class="post-row" href="/blog/${p.slug}/" data-search="${h(`${p.title} ${p.description} ${p.text}`.toLowerCase())}"><small>${p.date} · ${p.minutes} min read</small><h2>${h(p.title)}</h2><p>${h(p.description)}</p></a>`).join('');
const index = `<h1>${h(site)}</h1><p>Notes on building things.</p><form class="blog-search" role="search" hidden><label for="blog-search">Search posts</label><div><input id="blog-search" type="search" autocomplete="off"><kbd>/</kbd><button type="reset">Clear</button></div><p class="search-count" role="status"></p></form><section class="listing" aria-label="Posts">${rows}</section><p class="search-empty" hidden>No matching posts. Try another search.</p>`;
await output('blog', page(site, 'Notes on building things.', '/blog/', 'index', index, 'website'));
console.log(`Built ${posts.length} posts at ${origin}; example.com is for local preview only.`);
