# TabTell website design QA

## Evidence

- Source visual truth: `/Users/zihaozhang/.codex/generated_images/019f841a-6b51-7331-98f2-f2590e202eed/call_22ewQQFiOOROGk5J3u0tDJtt.png`
- Browser-rendered implementation: `/private/tmp/tabtell-home-final.png`
- Full-view comparison: `/private/tmp/tabtell-design-comparison.png`
- Focused middle-section comparison: `/private/tmp/tabtell-manual-comparison.png`
- Detailed-guide capture: `/private/tmp/tabtell-guide-final.png`
- Public routes checked:
  - `https://tabtell.imzh.me/`
  - `https://tabtell.imzh.me/guide/`
  - `https://tabtell.imzh.me/changelog/`
  - `https://tabtell.imzh.me/roadmap/`
  - `https://tabtell.imzh.me/privacy/`

## Normalization

- Source image: 864 × 1821 px.
- Homepage implementation: 1280 × 720 CSS viewport, reported device pixel ratio 2; the browser capture was normalized to 1280 × 720 px.
- Hero comparison: the source hero was cropped to 864 × 486 px and normalized to 1280 × 720 px before being placed beside the implementation.
- Middle-section comparison: the 864 × 660 px source region was normalized to 1224 px wide and padded to the 1224 × 1393 px implementation section height. The implementation deliberately gives the real screenshots more vertical space so their controls remain readable.
- State: public Chinese homepage, light theme, no account or authentication state.

## Findings

No actionable P0, P1, or P2 issues remain.

- Fonts and typography: the implementation keeps the source’s oversized editorial headline, compact navigation, strong number hierarchy, and restrained body scale. Chinese headings no longer leave a single character on a separate line.
- Spacing and layout rhythm: hero, three-step strip, modular 01–03 walkthrough, guide rail, model/changelog panels, roadmap, privacy, support, and footer retain the source order and grouping. The guide uses a sticky desktop table of contents and a horizontal mobile chapter rail.
- Colors and tokens: warm off-white, near-black, dark teal, and pale mint map consistently across the homepage and all new pages. Contrast and focus-visible treatment remain clear.
- Image quality and asset fidelity: the hero and guide use real TabTell captures rather than placeholder UI. The supplied TabTell icon is used for branding and the screenshots keep their native aspect ratios.
- Copy and content: product claims were tightened during review. The final copy refers to supported webpages, browser-saved records, tab-switch continuation, and the absence of a TabTell account or relay server without overstating provider behavior.
- Interaction and accessibility: Chinese/English switching updates the document language; guide links expose `target="_blank"`; all five public routes load over HTTPS; browser console logs were empty on the homepage, guide, changelog, roadmap, and privacy pages.
- Responsive implementation: desktop, tablet, and mobile layouts are defined at 1080 px, 820/780 px, and 540 px breakpoints. The in-app browser supplied a 1280 px verification viewport, so alternate breakpoints were checked in CSS and static builds rather than captured from a second browser viewport.

## Focused comparison

The focused middle-section comparison confirms the selected modular direction:

- the numbered walkthrough remains the primary reading path;
- each step keeps a text column beside a real screenshot;
- the detailed guide is visually separate and opens as its own page;
- the implementation is intentionally less compressed than the concept image so labels inside the extension screenshots remain legible.

No additional close-up was needed for the hero controls because the 1280 × 720 comparison keeps their labels, borders, icon, and product screenshot readable.

## Comparison history

### Pass 1

- [P2] The homepage had a third guide link below the two primary actions, making the hero busier than the selected design.
- [P2] The first guide capture left “话” and “方式” as isolated line fragments in large headings at 1280 px.

Fixes:

- Removed the redundant inline guide link while keeping the primary guide button and navigation link.
- Reduced the guide hero and chapter display sizes, preserving the bold hierarchy without awkward Chinese wrapping.
- Added route-specific titles and descriptions for the guide, changelog, and roadmap.

### Pass 2

Post-fix evidence:

- `/private/tmp/tabtell-design-comparison.png`
- `/private/tmp/tabtell-manual-comparison.png`
- `/private/tmp/tabtell-guide-final.png`

The revised captures contain no remaining P0, P1, or P2 mismatch.

## Follow-up polish

- [P3] The concept image uses check icons beside the three trust statements; the implementation uses native list markers to keep the visual language simpler and avoid introducing a one-off icon treatment.
- [P3] A future English release can replace the two clearly captioned Chinese settings screenshots in the English Skills and backup chapters when equivalent safe captures are available.

## Verification

- `npm run lint`: 0 errors; existing image-optimization recommendations only.
- `npm test`: passed, 2/2.
- `npm run build:pages`: passed; `/`, `/guide`, `/changelog`, and `/roadmap` generated as static routes.
- GitHub Pages production deployment: passed.
- Browser console: no errors on verified public routes.

final result: passed
