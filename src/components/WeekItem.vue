<template>
  <div style="width: 100%; margin: 0.5em 0;">
    <div style="font-size: 1.5em">{{ routine?.name }}</div>
    <div style="display: flex">
      <ion-button
        v-for="(day, index) in days"
        :key="index"
        style="flex: 1"
        @click="handleDayClicked(day)"
        :color="getColor(routine?.records[day.toISOString().slice(0, 10)])"
        :fill="
          routine?.records[day.toISOString().slice(0, 10)]?.value != null
            ? 'solid'
            : 'outline'
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
import { ref } from "vue";

const routine = defineModel<Routine>("routine", {
  required: true,
});

const days = ref(getWeekDays());
const locale = ref(navigator.language ?? "en-US");

const handleDayClicked = async (day: Date) => {
  const alert = await alertController.create({
    header: day.toLocaleDateString(locale.value),
    subHeader: "Did you achieve your goal?",
    inputs: [
      {
        label: "Positive",
        type: "radio",
        value: "+",
      },
      {
        label: "Neutral",
        type: "radio",
        value: "=",
      },
      {
        label: "Negative",
        type: "radio",
        value: "-",
      },
      {
        label: "Skip",
        type: "radio",
        value: "",
      },
    ],
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
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
            default:
              routine.value.records[key].value = undefined;
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
