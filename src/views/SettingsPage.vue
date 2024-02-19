<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item button>
          <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
          <ion-label>
            Account
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="contrastOutline"></ion-icon>
          <ion-toggle>
            Darkmode
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="hammerOutline"></ion-icon>
          <ion-label>
            Version
          </ion-label>
          <ion-note color="medium" class="ion-text-wrap">1.0.0</ion-note>
        </ion-item>
        <ion-item button lines="none">
          <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
          General
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { contrastOutline, hammerOutline, personCircleOutline, settingsOutline } from 'ionicons/icons';
</script>
