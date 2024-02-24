<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Record</ion-title>
        <ion-buttons slot="end">
          <ion-button title="Toggle View">
            <ion-icon slot="icon-only" :icon="calendar"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Record</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-item>
        <WeekHeader :highlighted-day-index="5" />
      </ion-item>
      <div v-if="!routines.length">
        Click bottom right + to add new routine.
      </div>
      <ion-list>
        <WeekItem
          v-if="routines.length"
          v-for="header in routines.map((r) => r.name)"
          :key="header"
          :header="header"
        />
      </ion-list>
      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button title="Add" @click="openModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  modalController,
} from "@ionic/vue";
import { add, calendar } from "ionicons/icons";
import WeekHeader from "@/components/WeekHeader.vue";
import WeekItem from "@/components/WeekItem.vue";
import RoutineModal from "./RoutineModal.vue";
import { appStorage } from "@/utils/storage";
import { AppData, Routine } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { onMounted, ref } from "vue";

const routines = ref([] as Routine[]);
let appDataRef = {} as AppData;

onMounted(async () => {
  const appData: AppData = await appStorage.get(STORAGE_KEYS.APP_DATA);

  appDataRef = appData ?? { routines: [] };
  routines.value = appDataRef?.routines ?? [];
});

const openModal = async () => {
  const modal = await modalController.create({
    component: RoutineModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === "confirm") {
    const newRoutine: Routine = { name: data["name"], records: [] };
    routines.value.push(newRoutine);

    await appStorage.set(STORAGE_KEYS.APP_DATA, appDataRef);
  }
};
</script>
