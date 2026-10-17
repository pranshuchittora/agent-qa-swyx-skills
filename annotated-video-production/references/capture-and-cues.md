# Captures and cue records

Use the existing project format when possible. A lightweight JSON table plus an HTML review board is sufficient; do not introduce a new rendering framework just to store cues.

Each selected cue should carry:

- Stable ID, source-cut ID, start/end or duration, topic, and verified speaker where known.
- Exact source URL, author/product, publication date where relevant.
- Exact requested visual (e.g. attached device photo, specific chart, demo action, article passage).
- Asset path and media type; source clip in/out or screenshot crop/scroll stops.
- Capture status and visual inspection result. A file existing is not a passed capture.
- Relationship to the discussion and uncertainties, kept separate from public captions.
- Intended treatment, short on-screen attribution, human-readable link, and placement per camera setup.
- User selection state, proposed changes, render version, final-frame evidence, and disposition.

For example, keep these as separate fields:

```json
{
  "id": "device-photo",
  "requested_visual": "The product photo attached to the founder's post",
  "asset_kind": "photo",
  "asset_path": "assets/device-original.jpg",
  "capture_status": "visually_verified",
  "source_relationship": "Exact announcement; later than recording",
  "caption": "Muse Charm · @finkd",
  "render_status": "not_rendered"
}
```

## Capture completion

For a post: open the exact post, inspect the attachment and all relevant images, save the original media and optionally an author/text screenshot. Verify the attachment has loaded before capture. For a video: inspect representative frames and choose a segment that demonstrates the point. For a chart: retain axes, legend, date/source, and the comparison of interest. For a document: retain enough heading/context to identify it while making the actual passage readable.

Do not publish a blank media box, a loading spinner, a cookie banner over a product UI, or a paused video tile as a functioning demo. Avoid unrelated replies and other account information in captures.

If capture fails, distinguish photo/video/page failure. Open the site's attachment viewer and inspect the observed media URL before declaring the asset unavailable. Recover from an existing local original before repeating web research. A photo-only post failing a video downloader is a routing error, not unavailable media.

## Before rendering

Reconcile selected cues with actual asset inputs. Flag every selected image/chart/demo routed to a text-only renderer. Each such change needs an editorial reason grounded in the viewing experience; “easier to render,” “download failed,” or “text was available” is not sufficient.

For a multi-product comparison, verify all selected products are represented. A three-product cue becoming a single slogan is an omission even when the slogan is accurately sourced.

Keep a failed or removed cue visible in the production record. Do not overwrite evidence that explains what changed.
