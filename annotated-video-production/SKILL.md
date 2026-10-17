---
name: annotated-video-production
description: Produce or audit source-backed overlays for recorded conversations, podcasts, and panels, from cut selection and reference research through visual review, preview renders, full-video QA, and release packaging. Use when enriching existing footage with posts, screenshots, demos, or pull quotes; not for standalone motion graphics or transcript-only summaries.
---

# Annotated video production

Make the conversation easier to follow and more rewarding to watch. Show the product, post, chart, or action being discussed. Do not turn a filmed conversation into a deck of paraphrases.

## Start from the current stage

Recover the chosen video, timebase, approved visual treatment, cue selections, asset manifest, latest render, and outstanding feedback. Continue from that state; do not restart research or design unnecessarily.

- **Planning only:** research widely and make choices concrete; do not render the episode yet.
- **Preview requested:** produce the requested interval, commonly the first ten minutes.
- **Full render approved:** extend the approved treatment and quality, not merely its CSS or card template.
- **Audit requested:** compare planned assets with what actually appears in the encoded video. Report every insertion; do not rerender unless requested or clearly authorized. “Don't rerender” stops rendering, not useful inspection.
- **Publish requested:** follow the explicit channel and visibility scope. Thumbnail creation or render approval alone does not authorize public release.

Keep original footage and each review version intact. Store private footage, transcripts, captures, exports, and per-episode production notes in the project's ignored media area. The reusable skill library contains instructions, not episode exports or credentials.

## 1. Choose and understand the recording

When several edits exist, compare actual duration, opening, audio, camera coverage, continuity, and representative segments. Do not choose by filename, upload date, or resolution alone. Record which cut wins and why.

Use the transcript to find topics, references, and likely insert points. Verify them against footage: transcript text does not establish speaker identity, visual timing, or camera position. Map names from verified introductions or supplied context, not anonymous ASR labels.

Keep one canonical source timebase. If an edit changes timing, record the mapping before applying cues from another cut.

## 2. Go wide on references; let the user cut

Build a broad chronological candidate board across the whole conversation. Cover new topics and substantive long monologues, not just the opening. Frequency should feel reasonably even while leaving the conversation room to breathe; do not add filler to hit a quota.

Reference priority:

1. The guest's own post, demo, article, or project describing the same point.
2. The exact primary product announcement, documentation, screenshot, chart, or media.
3. A clearly relevant external explanation that makes the point visible.
4. An intentional pull quote or simple explanatory diagram when that is genuinely the best treatment.

For a long monologue or new argument, identify the speaker and search their own posts. When relevant to this user's workflow, use X `filter:follows`, their selected high-signal lists/list search, and Latent Space AINews at https://www.latent.space/s/ainews. Search existing guest posts before adding another generic reference.

Later posts and updates are acceptable for this user's reference style. Keep dates available and avoid false chronology, but do not stamp every insert with a warning that it came later.

Present each candidate with timestamp, speaker/topic, source link, exact proposed visual, reason it helps, and expected hold. Import the user's selected-cue export and preserve deletions, additions, and edits. A link alone is not a resolved visual.

## 3. Resolve actual assets before building

Read [references/capture-and-cues.md](references/capture-and-cues.md) for capture checks and the cue record.

Capture the relevant image or functioning demo, not just surrounding text. Download original attached media where available; otherwise capture the loaded source page. Use Chrome for authenticated sessions in this user's environment. Apply the installed resilient-computer-use recovery workflow if browser automation fails.

**A failed capture is not permission to replace an image with prose.** A post can contain a photo but no video. A downloader's “no video” result does not establish that no visual exists. Inspect the attachment/photo viewer, obtain its media URL, save it, and visually inspect the result.

Watch for blank media areas, spinners, cookie dialogs, browser chrome, play buttons, and partial screenshots. Check the source asset itself, not just its filename or successful HTTP status. Separate “source found,” “asset captured,” “visually verified,” and “used in render.”

Prefer actual playing source video for a demo. Choose the interval showing the useful action/result, not the opening logo, presenter introduction, or “coming up” teaser. For articles or long posts, use a deliberate scroll with pauses on the relevant passage. A still pan is a still pan, not a live product demonstration.

If the exact asset remains unavailable, keep the gap explicit in production notes and propose a useful replacement or omit the insertion. Do not silently substitute promotional copy.

## 4. Design for the conversation

Sample representative frames for mostly static camera setups and use simple speaker-aware placement rules. Do not spend excessive time on exhaustive tracking unless the footage warrants it.

- Protect the active speaker's eyes and mouth. Covering listeners, hands, or the table is acceptable when it makes the insert readable. Reposition or end the insert at a cut that changes the safe region.
- Make square and tall assets large enough to read. Use the side, lower area, and available upper space; do not squeeze everything into a shallow lower third.
- Preserve natural aspect ratio. Fit the card to the asset, crop irrelevant margins, or use a cutaway/split composition. No letterboxed white padding or distorted images just to fill a fixed rectangle.
- Preserve a readable whole source, then focus on the relevant detail. Crop or scroll intentionally. Highlight complete words/lines with padding; boxes must track the moving source and never cut through text. Prefer a focused crop or subtle emphasis when a box adds clutter.
- Use brief, readable product/author attribution and a meaningful URL/domain. Put long tracking URLs and full source links in the description/production record. Avoid shrinking text until it technically fits.
- Use the channel's existing fonts, palette, and logo. Do not repeat a large logo on every insert when the video already has one.

Pull quotes are allowed and can be excellent. Use them for a memorable argument, in moderation, alongside real visuals. Preserve exact words when quoting, and attribute naturally. Do not replace charts, diagrams, product screenshots, or requested attached photos with generic title/body cards.

**Keep production caveats out of the viewing experience.** Repetitive labels such as “PRODUCT PAGE EXCERPT,” “DISCUSSION SUMMARY,” “Not a measured benchmark,” and “Not the guest's private workspace” are not useful captions. Keep uncertainty and source relationships in the cue record. If a distinction matters to understanding, express it briefly and naturally (for example “Orchid ad” or a source/date); choose a better asset rather than attaching a disclaimer to a misleading one.

Use restrained but perceptible entrances/exits and a short sound cue when requested. Listen at normal playback volume under dialogue: audible without masking speech. Do not rely on lack of clipping as evidence that the sound works. Vary visual treatments by purpose rather than animating every card identically.

## 5. Preview, critique, agree

Create a review board with exact assets and representative in-frame compositions. For wider creative exploration, use the installed design/image-generation skills only for treatments, not to fabricate evidence or product screenshots.

Render the requested preview interval. Inspect it at actual viewing size, including a small-screen view, and play the transitions, scrolling, source clips, and audio. Give a judgment: what works, what should be cut, and what needs repair. User feedback on scale, margins, face coverage, attribution, or style applies throughout the episode.

Approval of a good ten-minute preview approves that quality and variety. It does not approve filling the remaining hour with text fallbacks. Reconcile the final cue plan against the selected assets before the full render.

## 6. Audit the encoded result

Read [references/render-review.md](references/render-review.md) for the acceptance pass and known failure cases.

Review **every insertion in the final encoded file**, not only synthetic composite previews or a few attractive frames. For each cue, inspect its entrance/settled view, useful content, exit, and any camera cut while active. For moving media, play the interval to confirm the action, scroll, and reading time. Contact sheets help coverage but do not establish motion or audio quality.

Compare three things: what the user selected, the captured source, and what was actually rendered. Report omissions/substitutions even when the output looks polished. Fix systematic defects in the treatment, then check all affected cues. Do not claim a complete audiovisual pass from still sampling.

Return a per-cue keep/refine/replace/remove list with timestamps and evidence. A technical decode/audio-level check complements, but never replaces, editorial and visual review.

## 7. Package and release within scope

Deliver versioned video, source/cue manifest, review findings, and unresolved gaps. Verify duration, audio continuity, aspect ratio, playback, and output integrity before handing off.

For this user's series, title/thumbnail identity comes first: e.g. `High Taste Testers: [episode hook]`. Offer distinct hooks around actual tools, spending, product judgment, or agent trust. Let selections teach the next round. Thumbnail variants should change idea/composition, not just palette. Use all requested real faces, official channel/event assets, and mobile/timestamp-safe framing. If asked for event branding, research its actual current logo and marketing artwork; typing the event name into an unrelated template is insufficient.

Use the relevant installed YouTube skill for upload/metadata changes. Verify the active account and intended channel; do not infer it from a public channel page. Preserve authorized visibility and verify the uploaded ID and processing state. Never claim an existing YouTube video has been replaced by a local rerender. Do not change a live release merely because an audit found problems.
