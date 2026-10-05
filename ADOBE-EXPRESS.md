# Adobe Express add-on package

The add-on is named **DesignXDM Sneaker Studio** (24 characters, within Adobe's 25-character listing-name limit). It uses manifest v2 and the stable UI SDK. It requires no API keys, backend or document sandbox.

## Build the upload ZIP

```sh
npm install
rm -rf dist dist.zip
npm run package
```

This creates `dist.zip` with `manifest.json` at the archive root and the complete bundled interface. `dist/` contains the same uncompressed files. The existing Render site stays a standalone preview; the ZIP is what Adobe hosts for the add-on.

## Private testing in Adobe Express

1. Sign in to Adobe Express and enable **Add-on Development** in settings.
2. Open Add-ons and create a new add-on listing named **DesignXDM Sneaker Studio** (or another available name within 25 characters).
3. Use the private distribution workflow and upload the generated ZIP as the add-on package.
4. Use Adobe's preview/test workflow or generated private distribution link, then open the add-on inside an Express document.
5. Design a shoe and click **Add to Express**. The SDK inserts an 1800 × 1020 transparent PNG on the current page.

Official instructions: https://developer.adobe.com/express/add-ons/docs/guides/build/distribute/private-dist/

## Checks before public submission

- Open the panel at the normal Adobe Express width and verify all controls are reachable.
- Test every silhouette and panel, graphic upload/dragging, text, undo/redo, save/open and reload recovery.
- Click Add to Express and check the inserted image retains colours, patterns, materials and graphics with no selection borders. Insertion is a flattened PNG; internal designer layers are preserved in saved project files.
- Check retry behaviour on a connection or insertion error.
- Test external inspiration links and download permissions inside the host iframe.
- Browser storage availability varies in embedded contexts. The app reports storage errors; downloaded project files are the portable backup.
- Prepare the listing icon, screenshots, description, support contact, privacy policy and terms required by Adobe's current submission form. No marketplace approval is implied by building a ZIP.

The stable SDK insertion path is implemented and tested with a mock SDK, but must still be verified inside a signed-in Adobe Express session before public submission. Perspective/AI mock-ups are not included.

## Listing copy

**Summary:** Design a sneaker your way with editable panels, colourways, patterns and your own artwork.

**Description:** Create your own sneaker in Adobe Express with five generic silhouettes, independently editable panels, colours, patterns and material-inspired finishes. Add your own logo, artwork or text, position it on the shoe and explore real references from nature, space and museum collections. You choose what to use and make every design decision. Add the finished sneaker to your Express page, download a presentation board, or save an editable project to continue later.

**Keywords:** sneaker, shoe, colourway, footwear, design, classroom, patterns, creativity
