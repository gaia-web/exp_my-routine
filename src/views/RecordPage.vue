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
      <ion-list>
        <WeekItem
          v-for="header in ['Foo', 'Bar', 'Woo']"
          :key="header"
          :header="header"
        />
      </ion-list>
      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button title="Add">
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
} from "@ionic/vue";
import { add, calendar } from "ionicons/icons";
import WeekHeader from "@/components/WeekHeader.vue";
import WeekItem from "@/components/WeekItem.vue";
</script>
