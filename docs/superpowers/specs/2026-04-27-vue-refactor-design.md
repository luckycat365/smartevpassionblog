# Vue.js Refactor Design Specification

## 1. Goal and Scope

Refactor the current vanilla JS SPA into a Vite + Vue 3 application while preserving all existing features: brand/sub-brand browsing, YouTube video embeds, and the canvas racing game. The output must be statically deployable to GitHub Pages.

## 2. Tooling & Build

- **Framework:** Vue 3 with `<script setup>` SFCs
- **Build tool:** Vite
- **Routing:** Vue Router 4 in hash mode
- **Testing:** Dormant — existing Jest tests kept but not migrated (to be revisited later)
- **Deploy:** `gh-pages` npm package; `vite build && gh-pages -d dist`
- **`vite.config.js`:** `base: '/smartevblog/'` for correct asset paths on GitHub Pages

The YouTube IFrame API `<script src="https://www.youtube.com/iframe_api">` tag stays in `index.html`.

## 3. Project Structure

```
smartevblog/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js                        # createApp, mount, router
│   ├── router.js                      # hash-mode routes
│   ├── data.js                        # unchanged EVData export
│   ├── style.css                      # unchanged
│   ├── assets/                        # unchanged
│   ├── composables/
│   │   └── useYouTubePlayers.js
│   ├── components/
│   │   ├── BrandCard.vue
│   │   └── ModelCard.vue
│   └── pages/
│       ├── HomePage.vue
│       ├── BrandPage.vue
│       ├── SubBrandPage.vue
│       └── GamePage.vue
└── App.vue                            # header + <RouterView>
```

Old files removed: `src/app.js`, `src/game.js` (absorbed into `GamePage.vue`), root `index.html` replaced.

## 4. Routing

Vue Router 4, hash mode. Four routes:

| Hash | Component | Route Params |
|---|---|---|
| `#/` | `HomePage.vue` | — |
| `#/:brandId` | `BrandPage.vue` | `brandId` |
| `#/:brandId/:subBrandId` | `SubBrandPage.vue` | `brandId`, `subBrandId` |
| `#/game` | `GamePage.vue` | — |

Navigation uses `router.push()`. No Vuex/Pinia — data is static and read directly from `data.js` imports.

## 5. Components

### `App.vue`
Renders the site header (logo + game button) and `<RouterView />`. Logo click navigates to `#/`.

### `BrandCard.vue`
Props: `brand` object. Renders brand image + name inside a `<RouterLink>` to `#/:brand.id`.

### `ModelCard.vue`
Props: `model` object. Renders a `<div class="yt-placeholder" :data-video-id="model.videoId">`. YouTube hydration is managed externally by the composable.

### `HomePage.vue`
Imports `EVData`, loops with `v-for`, renders `<BrandCard>` for each brand.

### `BrandPage.vue`
Reads `brandId` from route params. Looks up brand in `EVData`. Renders the glass panel with brand name, description, and AI disclaimer. If brand has `subBrands`, renders a grid of `<BrandCard>` pointing to sub-brand routes. If brand has `models`, renders a grid of `<ModelCard>`. Calls `useYouTubePlayers` composable.

### `SubBrandPage.vue`
Reads `brandId` + `subBrandId` from route params. Looks up sub-brand. Renders glass panel with back button to parent brand, then a `<ModelCard>` grid. Calls `useYouTubePlayers` composable.

### `GamePage.vue`
Renders canvas element + mobile controls. Imports `startGame`/`stopGame` from the existing `game.js` logic (rewritten as a plain ES module under `src/game.js`). Calls `startGame()` in `onMounted`, `stopGame()` in `onUnmounted`.

## 6. Composable: `useYouTubePlayers.js`

Encapsulates the YouTube IFrame API lifecycle. Used by `BrandPage` and `SubBrandPage`.

- `initPlayers()` — queries all `.yt-placeholder` elements in the current view, instantiates `YT.Player` for each, wires up the `onStateChange` handler to pause other players when one starts playing. Waits for `window.YT` to be ready if needed.
- `clearPlayers()` — destroys all active player instances and resets internal state.

Page components call `initPlayers()` in `onMounted` and `clearPlayers()` in `onUnmounted`. This replaces the manual `clearPlayers()` calls that currently precede every view transition in `app.js`.

## 7. Data Layer

`src/data.js` is unchanged. The `module.exports` dual-export (CommonJS + browser global) is replaced with a single ES module `export default EVData` since Vite handles module bundling and Jest tests are dormant.

## 8. Styling

`src/style.css` is imported globally in `main.js` — no changes to CSS rules. Google Fonts `<link>` stays in `index.html`.

## 9. GitHub Pages Deployment

- `vite.config.js` sets `base: '/smartevblog/'`
- `package.json` deploy script: `"deploy": "vite build && gh-pages -d dist"`
- Hash-mode routing works on GitHub Pages without any redirect tricks
- Vite automatically copies `src/assets/` into `dist/assets/` during build
