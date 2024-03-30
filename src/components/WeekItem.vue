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
            day.toISOString().slice(0, 10) >
            new Date().toISOString().slice(0, 10)
          "
        >
        </ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routine, RoutineRecord } from "@/utils/app-data";
import { getFirstDayOfWeek, getWeekDays } from "@/utils/day";
import { IonButton, IonInput, alertController } from "@ionic/vue";
import { onMounted, ref, watch } from "vue";

const days = ref();
const locale = ref(navigator.language ?? "en-US");

const props = defineProps({
  firstDayOfWeek: Number,
  editingViewEnabled: Boolean,
});

watch(
  () => props.firstDayOfWeek,
  () => {
    days.value = getDays();
  }
);

onMounted(() => {
  days.value = getDays();
});

const routine = defineModel<Routine>("routine", {
  required: true,
});

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

function getDays() {
  return getWeekDays(
    props.firstDayOfWeek && props.firstDayOfWeek > 0
      ? getFirstDayOfWeek(new Date(), props.firstDayOfWeek)
      : void 0
  );
}
</script>
