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

      Routine Name: {{ $route.params.routineName }}
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
} from "@ionic/vue";

defineProps({
  routineName: String,
});
</script>
