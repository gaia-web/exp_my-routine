<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/record">
          <ion-icon aria-hidden="true" :icon="pencil" />
          <ion-label>Record</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/history">
          <ion-icon aria-hidden="true" :icon="barChart" />
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { barChart, pencil, settings } from "ionicons/icons";
</script>
