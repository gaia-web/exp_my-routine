<template>
  <div id="container">
    <div
      v-for="(day, index) in days"
      :key="index"
      :class="{ item: true, highlight: index === days.length - 1 }"
      :title="day.toLocaleDateString(locale)"
    >
      {{ getWeekDayName(day, locale) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWeekDays, getWeekDayName } from "@/utils/day";
import { ref } from "vue";

const days = ref(getWeekDays());
const locale = ref(navigator.language ?? "en-US");
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
