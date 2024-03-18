<template>
  <div style="width: 100%; margin-top: 2em">
    <div style="font-size: 1.5em">{{ routine?.name }}</div>
    <div style="display: flex">
      <ion-button
        v-for="day in days"
        :key="day.toISOString().slice(0, 10)"
        style="flex: 1"
        @click="handleDayClicked(day)"
        :color="getColor(routine?.records[day.toISOString().slice(0, 10)])"
        :fill="
          routine?.records[day.toISOString().slice(0, 10)]?.value != null
            ? 'solid'
            : 'outline'
        "
        :disabled="
          day.toISOString().slice(0, 10) > new Date().toISOString().slice(0, 10)
        "
      >
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routine, RoutineRecord } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { getFirstDayOfWeek, getWeekDays } from "@/utils/day";
import { appStorage } from "@/utils/storage";
import { IonButton, alertController } from "@ionic/vue";
import { ref } from "vue";

const firstDayOfWeek = +(await appStorage.get(STORAGE_KEYS.FIRST_DAY_OF_WEEK));

const routine = defineModel<Routine>("routine", {
  required: true,
});

const days = ref(
  getWeekDays(
    firstDayOfWeek > 0 ? getFirstDayOfWeek(new Date(), firstDayOfWeek) : void 0
  )
);
const locale = ref(navigator.language ?? "en-US");

const handleDayClicked = async (day: Date) => {
  const value = routine.value.records[day.toISOString().slice(0, 10)]?.value;
  const alert = await alertController.create({
    header: `For ${routine.value.name}`,
    subHeader: `on ${day.toLocaleDateString(locale.value)}`,
    message: `What was the status of ${
      routine.value.name
    } on ${day.toLocaleDateString(locale.value)}?`,
    inputs: [
      {
        label: "Positive",
        type: "radio",
        value: "+",
        checked: value != null && value > 0,
      },
      {
        label: "Neutral",
        type: "radio",
        value: "=",
        checked: value != null && value == 0,
      },
      {
        label: "Negative",
        type: "radio",
        value: "-",
        checked: value != null && value < 0,
      },
    ],
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Skip",
        role: "destructive",
        handler: () => {
          const key = day.toISOString().slice(0, 10);
          if (!routine.value.records[key]) {
            routine.value.records[key] = {};
          }
          routine.value.records[key].value = undefined;
        },
      },
      {
        text: "Confirm",
        role: "confirm",
        handler: (value) => {
          const key = day.toISOString().slice(0, 10);
          if (!routine.value.records[key]) {
            routine.value.records[key] = {};
          }
          switch (value) {
            case "+":
              routine.value.records[key].value = 1;
              break;
            case "-":
              routine.value.records[key].value = -1;
              break;
            case "=":
              routine.value.records[key].value = 0;
              break;
          }
        },
      },
    ],
  });

  await alert.present();
};

const getColor = (routineRecord?: RoutineRecord) => {
  if (routineRecord?.value == null) {
    return "medium";
  }
  if (routineRecord.value > 0) {
    return "success";
  }
  if (routineRecord.value < 0) {
    return "danger";
  }
  return "medium";
};
</script>
