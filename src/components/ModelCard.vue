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
