<template>
  <div class="linear-progress" :style="`--progress-value: ${value}; --progress-color: #9c27b0`">
    <div class="progress-track">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.linear-progress {
  margin-top: 15px;
}

.progress-track {
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var('--progress-color');
  width: calc(var('--progress-value') * 1%);
  transition: width 0.5s ease;
  border-radius: 4px;
}
</style>
