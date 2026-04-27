<template>
  <div class="grid-container">
    <BrandCard v-for="brand in EVData" :key="brand.id" :brand="brand" />
  </div>
</template>

<script setup>
import { EVData } from '../data.js'
import BrandCard from '../components/BrandCard.vue'
</script>
