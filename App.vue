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
