# Vue.js Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the vanilla JS SPA into a Vite + Vue 3 application with Vue Router (hash mode), preserving all features — brand/sub-brand browsing, YouTube embeds, and the canvas racing game — deployable to GitHub Pages.

**Architecture:** `src/` becomes a Vue 3 project with page components under `src/pages/`, shared UI components under `src/components/`, and a composable `src/composables/useYouTubePlayers.js` replacing the manual player management in `app.js`. Vue Router maps hash paths to page components. `data.js` becomes a plain ES module (no more CommonJS shim). `game.js` is kept as-is but asset paths are updated for Vite.

**Tech Stack:** Vue 3 (`<script setup>`), Vite, Vue Router 4, `gh-pages` npm package

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `vite.config.js` | Vite config, base path for GitHub Pages |
| Modify | `index.html` | Vite entry point (remove old `<script>` tags, add `<div id="app">`) |
| Create | `src/main.js` | createApp, mount, attach router |
| Create | `src/router.js` | Vue Router 4 hash-mode route definitions |
| Modify | `src/data.js` | Replace `module.exports` shim with `export default EVData` |
| Create | `src/App.vue` | Header (logo + game button) + `<RouterView>` |
| Create | `src/composables/useYouTubePlayers.js` | YT IFrame API lifecycle (init + clear) |
| Create | `src/components/BrandCard.vue` | Clickable brand image + name card |
| Create | `src/components/ModelCard.vue` | YouTube placeholder card |
| Create | `src/pages/HomePage.vue` | Brand grid using `<BrandCard>` |
| Create | `src/pages/BrandPage.vue` | Brand detail: description + sub-brands or models |
| Create | `src/pages/SubBrandPage.vue` | Sub-brand model grid |
| Create | `src/pages/GamePage.vue` | Canvas racing game with lifecycle hooks |
| Modify | `package.json` | Add vue, vue-router, vite, @vitejs/plugin-vue, gh-pages deps + scripts |
| Delete | `src/app.js` | Replaced by Vue components |

> `src/game.js` and `src/style.css` and `src/assets/` are kept unchanged except for asset path updates in `game.js` (see Task 8).

---

## Task 1: Install dependencies and scaffold Vite config

**Files:**
- Modify: `package.json`
- Create: `vite.config.js`

- [ ] **Step 1: Install dependencies**

```bash
npm install vue vue-router
npm install --save-dev vite @vitejs/plugin-vue gh-pages
```

Expected: `node_modules/vue`, `node_modules/vite` present. `package.json` updated with these deps.

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/smartevblog/'
})
```

- [ ] **Step 3: Add scripts to `package.json`**

Replace the `"scripts"` section in `package.json` with:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "vite build && gh-pages -d dist",
  "test": "jest"
}
```

- [ ] **Step 4: Verify Vite can start**

```bash
npm run dev
```

Expected: Terminal shows `VITE v*.*.* ready` and a local URL. The page will be blank/broken at this point — that's fine. Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add vite.config.js package.json package-lock.json
git commit -m "chore: add vite and vue dependencies"
```

---

## Task 2: Update `index.html` as Vite entry point

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html` content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart EVs</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
  <script src="https://www.youtube.com/iframe_api"></script>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

Key changes from the old file:
- Removed `<link rel="stylesheet" href="src/style.css">` (CSS imported in `main.js` instead)
- Removed all `<script src="src/...">` tags
- Removed the old `<header>` and `<main>` — those move into `App.vue`
- Added `<div id="app">` mount point
- Added Vite module entry `<script type="module" src="/src/main.js">`
- Kept YouTube IFrame API script tag

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "chore: update index.html for vite entry point"
```

---

## Task 3: Update `data.js` to ES module

**Files:**
- Modify: `src/data.js`

- [ ] **Step 1: Add `export default` to the EVData declaration**

At the top of `src/data.js`, change:

```js
const EVData = [
```

to:

```js
export const EVData = [
```

- [ ] **Step 2: Remove the CommonJS shim at the bottom of `src/data.js`**

Remove these lines at the end of the file:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVData };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data.js
git commit -m "refactor: convert data.js to ES module export"
```

---

## Task 4: Create router and main entry

**Files:**
- Create: `src/router.js`
- Create: `src/main.js`

- [ ] **Step 1: Create `src/router.js`**

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import BrandPage from './pages/BrandPage.vue'
import SubBrandPage from './pages/SubBrandPage.vue'
import GamePage from './pages/GamePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: GamePage },
  { path: '/:brandId', component: BrandPage },
  { path: '/:brandId/:subBrandId', component: SubBrandPage }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
```

Note: `/game` must be listed before `/:brandId` so Vue Router matches it first.

- [ ] **Step 2: Create `src/main.js`**

```js
import { createApp } from 'vue'
import App from '../App.vue'
import router from './router.js'
import './style.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 3: Commit**

```bash
git add src/router.js src/main.js
git commit -m "feat: add vue router and main entry point"
```

---

## Task 5: Create `App.vue`

**Files:**
- Create: `App.vue` (project root, alongside `index.html`)

- [ ] **Step 1: Create `App.vue`**

```vue
<template>
  <header class="app-header" style="flex-direction: column; align-items: center; gap: 10px;">
    <h1 id="logo" style="cursor:pointer;" title="Return home" @click="router.push('/')">⚡ Smart EVs</h1>
    <button class="game-btn" @click="router.push('/game')">🎮 Play Racing Game!</button>
  </header>

  <main id="app-content">
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
```

- [ ] **Step 2: Verify dev server renders the header**

```bash
npm run dev
```

Open the local URL in a browser. You should see the "⚡ Smart EVs" header and "🎮 Play Racing Game!" button. The main area will be blank (no pages yet). Stop the server.

- [ ] **Step 3: Commit**

```bash
git add App.vue
git commit -m "feat: add App.vue with header and RouterView"
```

---

## Task 6: Create `useYouTubePlayers` composable

**Files:**
- Create: `src/composables/useYouTubePlayers.js`

- [ ] **Step 1: Create `src/composables/useYouTubePlayers.js`**

```js
export function useYouTubePlayers() {
  let players = []

  function initPlayers() {
    const placeholders = document.querySelectorAll('.yt-placeholder')
    placeholders.forEach(el => {
      const videoId = el.getAttribute('data-video-id')
      const player = new window.YT.Player(el, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange(event) {
            if (event.data === window.YT.PlayerState.PLAYING) {
              players.forEach(p => {
                if (p !== player && p.getPlayerState() === window.YT.PlayerState.PLAYING) {
                  p.pauseVideo()
                }
              })
            }
          }
        }
      })
      players.push(player)
    })
  }

  function clearPlayers() {
    players.forEach(p => {
      try { p.destroy() } catch (_) {}
    })
    players = []
  }

  function init() {
    if (window.YT && window.YT.Player) {
      initPlayers()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayers()
      }
    }
  }

  return { init, clearPlayers }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/composables/useYouTubePlayers.js
git commit -m "feat: add useYouTubePlayers composable"
```

---

## Task 7: Create `BrandCard` and `ModelCard` components

**Files:**
- Create: `src/components/BrandCard.vue`
- Create: `src/components/ModelCard.vue`

- [ ] **Step 1: Create `src/components/BrandCard.vue`**

```vue
<template>
  <RouterLink :to="`/${brand.id}`" custom v-slot="{ navigate }">
    <div class="card brand-card" @click="navigate">
      <div class="card-video">
        <img :src="brand.image" :alt="brand.name" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="card-title">{{ brand.name }}</div>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({ brand: Object })
</script>
```

- [ ] **Step 2: Create `src/components/ModelCard.vue`**

```vue
<template>
  <div class="card model-card" style="cursor: default;">
    <div class="card-video">
      <div class="yt-placeholder" :data-video-id="model.videoId"></div>
    </div>
    <div class="card-title" style="font-size: 1rem;">{{ model.name }}</div>
  </div>
</template>

<script setup>
defineProps({ model: Object })
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BrandCard.vue src/components/ModelCard.vue
git commit -m "feat: add BrandCard and ModelCard components"
```

---

## Task 8: Create `HomePage.vue`

**Files:**
- Create: `src/pages/HomePage.vue`

- [ ] **Step 1: Create `src/pages/HomePage.vue`**

```vue
<template>
  <div class="grid-container">
    <BrandCard v-for="brand in EVData" :key="brand.id" :brand="brand" />
  </div>
</template>

<script setup>
import { EVData } from '../data.js'
import BrandCard from '../components/BrandCard.vue'
</script>
```

- [ ] **Step 2: Verify homepage renders in browser**

```bash
npm run dev
```

Open the local URL. You should see the brand grid with all brand images and names. Clicking a card will navigate to `#/:brandId` (page will 404 until BrandPage is created — that's fine). Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.vue
git commit -m "feat: add HomePage with brand grid"
```

---

## Task 9: Create `BrandPage.vue`

**Files:**
- Create: `src/pages/BrandPage.vue`

- [ ] **Step 1: Create `src/pages/BrandPage.vue`**

```vue
<template>
  <div v-if="brand">
    <div class="glass-panel">
      <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1rem;">{{ brand.name }}</h2>
      <p style="color: var(--text-main); font-size: 1.2rem; max-width: 900px; margin-bottom: 0.75rem;">
        {{ brand.description || '' }}
      </p>
      <p style="color: var(--text-muted); font-size: 0.8rem; font-style: italic; max-width: 900px; margin-bottom: 1.5rem;">
        &#9432; This summary is AI auto-generated based on AI's perception of the brand.
      </p>
      <button @click="router.push('/')" class="back-button">&larr; Back to Brands</button>
    </div>

    <template v-if="brand.subBrands">
      <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">Select a Sub-Brand</h3>
      <div class="grid-container">
        <RouterLink
          v-for="sub in brand.subBrands"
          :key="sub.id"
          :to="`/${brand.id}/${sub.id}`"
          custom
          v-slot="{ navigate }"
        >
          <div class="card brand-card" @click="navigate">
            <div class="card-video">
              <img :src="sub.image" :alt="sub.name" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="card-title">{{ sub.name }}</div>
          </div>
        </RouterLink>
      </div>
    </template>

    <template v-else-if="brand.models">
      <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">{{ brand.name }} Models</h3>
      <div class="grid-container">
        <ModelCard v-for="model in brand.models" :key="model.id" :model="model" />
      </div>
    </template>

    <template v-else>
      <p style="color: var(--text-muted);">No content added yet.</p>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EVData } from '../data.js'
import ModelCard from '../components/ModelCard.vue'
import { useYouTubePlayers } from '../composables/useYouTubePlayers.js'

const route = useRoute()
const router = useRouter()
const brand = computed(() => EVData.find(b => b.id === route.params.brandId))
const { init, clearPlayers } = useYouTubePlayers()

onMounted(() => {
  if (brand.value?.models) init()
})
onUnmounted(() => clearPlayers())
</script>
```

- [ ] **Step 2: Verify brand page works**

```bash
npm run dev
```

Click a brand on the homepage. You should see the glass panel with brand name, description, and either sub-brand cards or model cards with YouTube placeholders. If YouTube API loads, videos should appear. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/BrandPage.vue
git commit -m "feat: add BrandPage with models and sub-brands"
```

---

## Task 10: Create `SubBrandPage.vue`

**Files:**
- Create: `src/pages/SubBrandPage.vue`

- [ ] **Step 1: Create `src/pages/SubBrandPage.vue`**

```vue
<template>
  <div v-if="sub">
    <div class="glass-panel">
      <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1.5rem;">{{ sub.name }}</h2>
      <button @click="router.push(`/${route.params.brandId}`)" class="back-button">
        &larr; Back to {{ brand.name }}
      </button>
    </div>

    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">Models View</h3>
    <div class="grid-container">
      <ModelCard v-for="model in sub.models" :key="model.id" :model="model" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EVData } from '../data.js'
import ModelCard from '../components/ModelCard.vue'
import { useYouTubePlayers } from '../composables/useYouTubePlayers.js'

const route = useRoute()
const router = useRouter()
const brand = computed(() => EVData.find(b => b.id === route.params.brandId))
const sub = computed(() => brand.value?.subBrands?.find(s => s.id === route.params.subBrandId))
const { init, clearPlayers } = useYouTubePlayers()

onMounted(() => init())
onUnmounted(() => clearPlayers())
</script>
```

- [ ] **Step 2: Verify sub-brand page works**

```bash
npm run dev
```

Navigate to a brand with sub-brands (e.g., Tesla). Click a sub-brand. You should see the sub-brand name, back button, and model cards with YouTube embeds. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/SubBrandPage.vue
git commit -m "feat: add SubBrandPage with model grid"
```

---

## Task 11: Create `GamePage.vue`

**Files:**
- Create: `src/pages/GamePage.vue`
- Modify: `src/game.js` (asset path updates only)

- [ ] **Step 1: Update asset paths in `src/game.js`**

Vite serves files from `src/` relative to the project root. Update all asset `src` strings in `game.js`. Find and replace these lines:

```js
// Old:
player: { img: new Image(), src: 'src/assets/player_cyber_car.png' },
obstacle: { img: new Image(), src: 'src/assets/obstacles.png' },
battery: { img: new Image(), src: 'src/assets/Battery_cell.png' },
chip: { img: new Image(), src: 'src/assets/chip.png' },
victory: { img: new Image(), src: 'src/assets/Victory_cargame.png' }
```

```js
// New:
player: { img: new Image(), src: '/smartevblog/assets/player_cyber_car.png' },
obstacle: { img: new Image(), src: '/smartevblog/assets/obstacles.png' },
battery: { img: new Image(), src: '/smartevblog/assets/Battery_cell.png' },
chip: { img: new Image(), src: '/smartevblog/assets/chip.png' },
victory: { img: new Image(), src: '/smartevblog/assets/Victory_cargame.png' }
```

Also update the audio paths near the top of `game.js`:

```js
// Old:
const bgMusic = new Audio('src/assets/music/American Patrol.mp3')
```

```js
// New:
const bgMusic = new Audio('/smartevblog/assets/music/American Patrol.mp3')
```

Find and replace any other `src/assets/sound/` paths similarly:

```js
// Old pattern:    'src/assets/sound/Xyz.wav'
// New pattern: '/smartevblog/assets/sound/Xyz.wav'
```

- [ ] **Step 2: Create `src/pages/GamePage.vue`**

```vue
<template>
  <div class="glass-panel" style="text-align:center;">
    <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1.5rem;">Cyber Racer</h2>
    <button @click="router.push('/')" class="back-button">&larr; Back to Home</button>
  </div>

  <div class="game-container">
    <canvas id="gameCanvas" width="600" height="600"></canvas>

    <div class="mobile-controls">
      <button
        class="control-btn left-btn"
        @mousedown="setKey('ArrowLeft', true)" @mouseup="setKey('ArrowLeft', false)"
        @mouseleave="setKey('ArrowLeft', false)"
        @touchstart.prevent="setKey('ArrowLeft', true)" @touchend="setKey('ArrowLeft', false)"
      >&#9664;</button>
      <button
        class="control-btn right-btn"
        @mousedown="setKey('ArrowRight', true)" @mouseup="setKey('ArrowRight', false)"
        @mouseleave="setKey('ArrowRight', false)"
        @touchstart.prevent="setKey('ArrowRight', true)" @touchend="setKey('ArrowRight', false)"
      >&#9654;</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { startGame, stopGame } from '../game.js'

const router = useRouter()

function setKey(key, state) {
  if (window.setGameKey) window.setGameKey(key, state)
}

onMounted(() => {
  setTimeout(() => startGame(), 50)
})
onUnmounted(() => stopGame())
</script>
```

- [ ] **Step 3: Verify the game loads**

```bash
npm run dev
```

Click "Play Racing Game!" in the header. You should see the canvas with the racing game running. Mobile controls should appear. Press Escape or navigate back — the game stops. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/GamePage.vue src/game.js
git commit -m "feat: add GamePage and fix game asset paths for Vite"
```

---

## Task 12: Delete old files and verify full app

**Files:**
- Delete: `src/app.js`

- [ ] **Step 1: Delete `src/app.js`**

```bash
git rm src/app.js
```

- [ ] **Step 2: Run dev server and do a full walkthrough**

```bash
npm run dev
```

Test all routes manually:
1. Homepage shows brand grid ✓
2. Click a brand with models (e.g., Mercedes) → brand page with YouTube embeds ✓
3. Navigate back, click a brand with sub-brands (e.g., Tesla) → sub-brand cards ✓
4. Click a sub-brand → model grid with YouTube embeds ✓
5. Navigate back to home, click "Play Racing Game!" → game runs ✓
6. Back button on game page → returns to home ✓

Stop the server.

- [ ] **Step 3: Commit**

```bash
git commit -m "refactor: remove old app.js"
```

---

## Task 13: Production build and GitHub Pages deploy

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created containing `index.html`, `assets/` with hashed JS/CSS files, and all image/audio assets.

- [ ] **Step 2: Preview production build locally**

```bash
npm run preview
```

Open the preview URL and repeat the full walkthrough from Task 12 Step 2. Verify all assets (images, game sprites, audio) load correctly. Stop the preview server.

- [ ] **Step 3: Add `.superpowers/` to `.gitignore`**

Add this line to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 4: Deploy to GitHub Pages**

```bash
npm run deploy
```

Expected: `gh-pages` branch created/updated on the remote. GitHub Pages will serve from that branch.

- [ ] **Step 5: Commit `.gitignore` update**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm session files"
```
