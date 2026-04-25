# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Serve at http://localhost:8080 (uses npx serve)
npm test         # Run Jest test suite
```

To run a single test file:
```bash
npx jest tests/data.test.js
```

## Architecture

This is a vanilla JS single-page app — no build step, no framework. The browser loads `index.html`, which pulls in `src/data.js`, `src/app.js` (as classic scripts), and `src/game.js` (as an ES module).

**Routing** is hash-based (`window.location.hash`). `handleRoute()` in `app.js` parses the hash and calls one of:
- `renderHomepage()` — brand grid
- `renderBrandPage(brandId)` — brand detail; shows sub-brands or model videos
- `renderSubBrandPage(brandId, subBrandId)` — sub-brand model videos
- `renderGamePage()` — the canvas racing game

Navigation uses `navigateTo(path)`, which sets `window.location.hash`.

**Data** lives entirely in `src/data.js` as a global `EVData` array. Each brand entry has `id`, `name`, `image`, `description`, and either `models[]` or `subBrands[]` (which each have their own `models[]`). Models have a `videoId` for YouTube embeds.

**YouTube embeds** are lazy-initialized: the app renders `.yt-placeholder` divs with `data-video-id`, then `initYouTubePlayers()` hydrates them using the YouTube IFrame API (`YT.Player`). Only one video plays at a time — the `onStateChange` handler pauses others. `clearPlayers()` must be called before any view transition to avoid orphaned players.

**Game** (`src/game.js`) is a Canvas 2D racing game exported as an ES module (`startGame`, `stopGame`). It uses rAF-based game loop, keyboard + touch controls, sprite assets from `src/assets/`, and audio files from `src/assets/music/` and `src/assets/sound/`.

## Testing

Tests use Jest with `jsdom`. `app.js` is tested by manually constructing the DOM and requiring the module — `EVData` and `YT` are set as globals before requiring. `data.js` exports `EVData` via `module.exports` for CommonJS compatibility with Jest (the browser uses it as a plain global script).

There is a mismatch to be aware of: `data.js` exposes `EVData` as a global when loaded in the browser but also exports it via `module.exports` for the test environment.
