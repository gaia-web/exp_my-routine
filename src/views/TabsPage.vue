<template>
  <ion-page>
    <Suspense>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="routines" href="/routines">
            <ion-icon aria-hidden="true" :icon="checkmarkDone" />
            <ion-label>Routines</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="stats" href="/stats">
            <ion-icon aria-hidden="true" :icon="statsChart" />
            <ion-label>Stats</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="settings" href="/settings">
            <ion-icon aria-hidden="true" :icon="settings" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </Suspense>
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
import { checkmarkDone, settings, statsChart } from "ionicons/icons";
</script>
