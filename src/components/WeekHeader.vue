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
import { STORAGE_KEYS } from "@/utils/constant";
import { getWeekDays, getWeekDayName, getFirstDayOfWeek } from "@/utils/day";
import { appStorage } from "@/utils/storage";
import { ref } from "vue";

const firstDayOfWeek = +(await appStorage.get(STORAGE_KEYS.FIRST_DAY_OF_WEEK));

const days = ref(
  getWeekDays(
    firstDayOfWeek > 0 ? getFirstDayOfWeek(new Date(), firstDayOfWeek) : void 0
  )
);
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
