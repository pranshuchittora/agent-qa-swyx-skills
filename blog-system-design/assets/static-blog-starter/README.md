# Static blog starter

A small working TypeScript/Markdown example of the publication defaults. Run in
this directory with Node 22 and pnpm:

```sh
pnpm install
pnpm test
pnpm typecheck
SITE_URL=https://your-public-host.example pnpm build
python3 -m http.server -d dist 8000
```

Open `http://localhost:8000/blog/`. Without `SITE_URL`, metadata deliberately
uses `https://example.com` for local preview; set the actual HTTPS origin before
publishing. Cards are generated as 1200×630 PNGs at build time with Sharp, and
must be publicly served at the absolute URLs in the HTML. Check each card at
chat-preview size and check the deployed response, not just the source metadata.

Adapt this starter to the site's own shell and content model rather than
replacing an established blog. `build.ts` has two sample posts and curated
related links. `headings.ts` renders trusted Markdown and creates the heading
IDs shared by TOC and permalinks. Add `{#stable-id}` to preserve a published
fragment across heading edits. `public/blog.js` implements rail, TOC and index
search interactions; `public/blog.css` is an intentionally small skin. The
search sends article text to the browser and suits a small public archive only.

This is a starting point, not a drop-in production framework. Integrate the
site's existing router, content/asset pipeline and public URL conventions;
review imagery, typography, contrast, accessibility and mobile behavior in the
actual product. Markdown and raw HTML are trusted author input, not sanitized
user input. The sample card generator deliberately fails on titles that need a
custom layout rather than silently clipping them. Add meaningful, properly
licensed imagery or project-specific artwork where useful.
