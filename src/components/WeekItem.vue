<template>
  <div style="width: 100%; margin-top: 2em">
    <div style="font-size: 1.5em">{{ routine?.name }}</div>
    <div style="display: flex">
      <ion-button
        v-for="(day, index) in days"
        :key="index"
        style="flex: 1"
        @click="handleDayClicked(day)"
        :color="getColor(routine?.records[day.toString()])"
        :fill="
          routine?.records[day.toString()]?.value != null ? 'solid' : 'outline'
        "
      >
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routine, RoutineRecord } from "@/utils/app-data";
import { getWeekDays } from "@/utils/day";
import { IonButton, alertController } from "@ionic/vue";
import { Temporal } from "@js-temporal/polyfill";
import { ref } from "vue";

const routine = defineModel<Routine>("routine", {
  required: true,
});

const days = ref(getWeekDays());
const locale = ref(navigator.language ?? "en-US");

const handleDayClicked = async (day: Temporal.PlainDate) => {
  const value = routine.value.records[day.toString()]?.value;
  const alert = await alertController.create({
    header: `For ${routine.value.name}`,
    subHeader: `on ${day.toLocaleString(locale.value)}`,
    message: `What was the status of ${
      routine.value.name
    } on ${day.toLocaleString(locale.value)}?`,
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
          const key = day.toString();
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
          const key = day.toString();
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
