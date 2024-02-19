<template>
  <div id="container">
    <div
      v-for="(day, index) in days"
      :key="index"
      :class="{ item: true, highlight: highlightedDayIndex === index }"
    >
      {{ day }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  highlightedDayIndex: Number,
});

const days = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
</script>

<style scoped>
#container {
  width: 100%;
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  &.highlight {
    color: orange;
  }
}
</style>
