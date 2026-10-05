# DesignXDM Sneaker Designer

Find inspiration. Build a colourway. Design your sneaker.

A working browser prototype for an Adobe Express add-on. Users design the shoe themselves; the reference library provides real, credited research sources.

## Run locally

Requires Node.js 20 or newer. No package installation or build is needed.

```sh
npm start
```

Open http://localhost:3000. To check JavaScript syntax, run `npm run check`.

## Included

- Five original, generic editable silhouettes: low-top, high-top, runner, chunky and skate.
- Eight selectable zones, each with independent colours. Fabric and sole panels also support twelve pattern options (including solid) and six material textures.
- Custom colour and hex input, pattern accent colour and scale, and a palette saved on the current device.
- PNG, JPG and WebP upload; movable, resizable, rotatable and mirrorable artwork clipped to the upper.
- Text, layer selection/reordering/deletion and undo/redo.
- Automatic device-local draft saving and portable, validated JSON project save/open.
- Inspiration cards let users explicitly try the suggested pattern or material on the selected panel.
- Side-view presentation preview, view flip and zoom.
- Curated inspiration from NOAA comb-jelly photography, NASA Webb imagery and V&A collections, with links and credits. Inspiration adds suggested swatches without recolouring the shoe automatically.
- Transparent PNG, vector SVG and a presentation board with colour palette and selected reference credits.
- Responsive layout, keyboard-selectable panels and artwork, and editable numeric artwork coordinates.

## Hosting

The app is static: any static host can serve the `public` directory without a build step. For a Render Static Site connected to this repository, use an empty build command and `public` as the publish directory. A Node web service can instead run `npm start` and will use the supplied `PORT`.

This repository does not require ChatGPT Sites.

## Prototype limits

- Drafts and palettes save in browser storage on the current device. Storage can be blocked or full, and clearing browser data removes drafts. Download a `.sneaker.json` project with **Save project** for a portable backup; **Open** restores the editable design.
- Adobe Express SDK integration is the next phase. Export currently downloads an image for manual upload into Express.
- Preview is a clean side-view presentation, not a generated or perspective product mock-up. There is no AI image generation.
- Mirroring transforms the selected artwork. View flip shows the same design facing the other direction; it does not model a second shoe side.
- Reference discovery is a small curated library, not a live AI research service. External reference images and fonts require internet access; source links remain available when an image fails to load.
- Material textures are visual design treatments, not manufacturing specifications.
- Uploaded graphics should be artwork the user has permission to use. Reference photos are not automatically embedded in sneaker exports.

## Code

`public/index.html` defines the workspace, `public/style.css` styles it, and `public/app.js` owns the design state, interactive SVG, reference library and export. `server.mjs` is an optional dependency-free local/Node host. Shoe geometry is editable SVG, so colours and graphics are preserved during export.

Optional browser WebMCP APIs are feature-detected and expose the same panel state/actions. They have no backend or authentication requirement.
