import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPost } from './headings.js';

test('heading fragments reserve explicit IDs and match TOC entries', async () => {
  const post = await renderPost('## Road test\n\n## Road test\n\n## Renamed {#road-test}\n\n## Café & tea');
  assert.deepEqual(post.headings.map(x => x.id), ['road-test-2', 'road-test-3', 'road-test', 'cafe-tea']);
  for (const h of post.headings) {
    assert.ok(post.html.includes(`id="${h.id}"`));
    assert.ok(post.html.includes(`href="#${encodeURIComponent(h.id)}"`));
  }
});

test('rejects duplicate authored IDs, including HTML and shell IDs', async () => {
  await assert.rejects(renderPost('## One {#x}\n\n## Two {#x}'), /Duplicate ID/);
  await assert.rejects(renderPost('<div id="x"></div>\n\n## Two {#x}'), /Duplicate ID/);
  await assert.rejects(renderPost('## Two {#related-reading}', ['related-reading']), /Duplicate ID/);
});

test('heading labels decode entities and retain inline markup', async () => {
  const post = await renderPost('## A *copy* &copy;');
  assert.equal(post.headings[0].title, 'A copy ©');
  assert.match(post.html, /<em>copy<\/em>/);
  assert.match(post.html, /aria-label="Link to A copy ©"/);
});
