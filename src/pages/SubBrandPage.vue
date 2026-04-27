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
