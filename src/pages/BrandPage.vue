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
