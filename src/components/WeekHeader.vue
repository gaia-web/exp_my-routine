<template>
  <div id="container">
    <div
      v-for="day in days"
      :key="day.toString()"
      :class="{
        item: true,
        highlight: day.toString() === Temporal.Now.plainDateISO().toString(),
      }"
      :title="day.toLocaleString(locale)"
    >
      {{ getWeekDayName(day, locale) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWeekDayName } from "@/utils/day";
import { Temporal } from "@js-temporal/polyfill";
import { ref } from "vue";

defineProps({
  days: Array<Temporal.PlainDate>,
});

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
