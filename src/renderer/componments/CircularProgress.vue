<template>
  <div class="circular-progress" :style="`--progress-value: ${value}; --progress-color: ${color}`">
    <svg viewBox="0 0 100 100">
      <circle class="progress-bg" cx="50" cy="50" r="45" />
      <circle class="progress-fill" cx="50" cy="50" r="45" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#ff00ff'
  }
})
</script>

<style scoped>
.circular-progress {
  width: 100px;
  height: 100px;
  position: relative;
}

.circular-progress svg {
  width: 100%;
  height: 100%;
}

.progress-bg {
  fill: none;
  stroke: #333;
  stroke-width: 8;
}

.progress-fill {
  fill: none;
  stroke: var('--progress-color');
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-dasharray: 283;
  stroke-dashoffset: calc(283 - (283 * var('--progress-value')) / 100);
  transition: stroke-dashoffset 0.5s ease;
}
</style>
