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
import { ref } from "vue";

const days = ref(getWeekDays());
const locale = ref(navigator.language ?? "en-US");

function getWeekDays() {
  const weekDays = [];
  const baseDate = new Date();
  for (let i = 1; i <= 7; i++) {
    weekDays.unshift(baseDate);
    baseDate.setDate(baseDate.getDate() - 1);
  }
  return weekDays;
}

function getWeekDayName(day: Date, locale: string) {
  return day.toLocaleDateString(locale, { weekday: "short" });
}
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
