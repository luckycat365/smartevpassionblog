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
