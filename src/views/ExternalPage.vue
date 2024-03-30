<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>NFC</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">NFC</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { AppData } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { appStorage } from "@/utils/storage";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  onIonViewDidEnter,
} from "@ionic/vue";
import { useRouter } from "vue-router";

const props = defineProps({
  routineName: String,
  value: Number,
});

const router = useRouter();

onIonViewDidEnter(async () => {
  const appData = (await appStorage.get(STORAGE_KEYS.APP_DATA)) as
    | AppData
    | undefined;
  const records = appData?.routines.find(
    (routine) => routine.name === props.routineName
  )?.records;
  if (!records) {
    alert("Invalid input.");
    router.replace({ name: "record" });
    return;
  }
  records[new Date().toISOString().slice(0, 10)] = { value: props.value };
  await appStorage.set(STORAGE_KEYS.APP_DATA, appData);
  router.replace({ name: "record" });
});
</script>
