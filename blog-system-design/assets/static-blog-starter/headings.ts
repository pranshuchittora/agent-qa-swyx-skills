import { Marked } from 'marked';
import { decodeHTML } from 'entities';

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export type Heading = { id: string; title: string; depth: number };

// Use trusted Markdown; sanitize separately if authors can supply untrusted HTML.
export async function renderPost(markdown: string, reservedIds: string[] = []) {
  const headings: Heading[] = [];
  const used = new Set(reservedIds);
  const marked = new Marked();
  const tokens = marked.lexer(markdown);
  // Reserve authored IDs before slugging: a preceding generated title must not
  // steal an explicit, already-published fragment.
  marked.walkTokens(tokens, token => {
    if (token.type === 'html') {
      for (const match of token.text.matchAll(/\bid=["']([^"']+)["']/g)) {
        if (used.has(match[1])) throw new Error(`Duplicate ID: ${match[1]}`);
        used.add(match[1]);
      }
    }
  });
  marked.walkTokens(tokens, token => {
    if (token.type !== 'heading') return;
    const explicit = token.text.match(/\s*\{#([a-z0-9]+(?:-[a-z0-9]+)*)\}$/);
    if (explicit) {
      if (used.has(explicit[1])) throw new Error(`Duplicate ID: ${explicit[1]}`);
      used.add(explicit[1]);
    }
  });
  marked.use({ renderer: {
    heading({ tokens, depth }) {
      const rendered = this.parser.parseInline(tokens);
      const explicit = rendered.match(/\s*\{#([a-z0-9]+(?:-[a-z0-9]+)*)\}$/);
      const inline = explicit ? rendered.slice(0, explicit.index) : rendered;
      // Inline markup is still rendered inside the heading; use plain text in
      // the accessible label and TOC.
      const title = decodeHTML(inline.replace(/<[^>]*>/g, ''));
      const base = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/[\s-]+/g, '-') || 'section';
      let id = explicit?.[1] ?? base;
      if (!explicit) for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      headings.push({ id, title, depth });
      return `<h${depth} id="${escapeHtml(id)}">${inline}<a class="heading-link" href="#${encodeURIComponent(id)}" aria-label="Link to ${escapeHtml(title)}">#</a></h${depth}>\n`;
    }
  }});
  const html = await marked.parser(tokens);
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return { html, headings, text, minutes: Math.max(1, Math.ceil(text.split(/\s+/).length / 220)) };
}
