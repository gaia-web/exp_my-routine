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
          :key="day.toString()"
          style="flex: 1"
          @click="handleDayClicked(day)"
          :color="getColor(routine?.records[day.toString()])"
          :fill="
            routine?.records[day.toString()]?.value != null
              ? 'solid'
              : 'outline'
          "
          :disabled="day.toString() > Temporal.Now.plainDateISO().toString()"
        >
        </ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routine, RoutineRecord } from "@/utils/app-data";
import { IonButton, IonInput, popoverController } from "@ionic/vue";
import { Temporal } from "@js-temporal/polyfill";
import RecordRoutinePopover from "@/components/RecordRoutinePopover.vue";

defineProps({
  days: Array<Temporal.PlainDate>,
  editingViewEnabled: Boolean,
});

const routine = defineModel<Routine>("routine", {
  required: true,
});

const handleDayClicked = async (day: Temporal.PlainDate) => {
  const popover = await popoverController.create({
    component: RecordRoutinePopover,
    componentProps: {
      routine,
      day,
      dismiss: () => popover.dismiss(),
    },
    translucent: true,
  });
  await popover.present();
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
