<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>History</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">History</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-datetime
        size="cover"
        readonly
        presentation="date"
        :highlighted-dates="determinewhetherToHighlightTheDate"
      ></ion-datetime>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { AppData, INITIAL_APP_DATA } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { appStorage } from "@/utils/storage";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  onIonViewDidEnter,
} from "@ionic/vue";
import { ref } from "vue";

const appData = ref<AppData>(INITIAL_APP_DATA);
const determinewhetherToHighlightTheDate = ref<(isoString: string) => any>(
  () => void 0
);

onIonViewDidEnter(async () => {
  appData.value = await appStorage.get(STORAGE_KEYS.APP_DATA);
  determinewhetherToHighlightTheDate.value = (isoString: string) => {
    let neutralCount = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    for (const routine of appData.value.routines) {
      const record = routine.records[isoString];
      if (record != null) {
        if (record.value == null) {
          continue;
        }
        if (record.value === 0) {
          neutralCount++;
        }
        if (record.value > 0) {
          positiveCount++;
        }
        if (record.value < 0) {
          negativeCount++;
        }
      }
    }
    switch (true) {
      case positiveCount > negativeCount:
        return { backgroundColor: "var(--ion-color-success)" };
      case negativeCount > positiveCount:
        return { backgroundColor: "var(--ion-color-danger)" };
      case positiveCount > 0 && positiveCount === negativeCount:
      case neutralCount > 0:
        return { backgroundColor: "var(--ion-color-medium)" };
    }
  };
});
</script>
