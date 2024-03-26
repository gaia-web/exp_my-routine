<template>
  <div :style="{ width: '100%', marginTop: editingViewEnabled ? '0' : '1em' }">
    <ion-input
      v-if="editingViewEnabled"
      label="Routine Name"
      label-placement="stacked"
      type="text"
      v-model="routine.name"
    ></ion-input>
    <div v-else>
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
  </div>
</template>

<script setup lang="ts">
import { Routine, RoutineRecord } from "@/utils/app-data";
import { getWeekDays } from "@/utils/day";
import { IonButton, IonInput, alertController } from "@ionic/vue";
import { ref } from "vue";

const routine = defineModel<Routine>("routine", {
  required: true,
});

defineProps<{
  editingViewEnabled: boolean;
}>();

const days = ref(getWeekDays());
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
