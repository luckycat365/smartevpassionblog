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
