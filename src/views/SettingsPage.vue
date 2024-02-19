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
          <ion-icon name="person-circle-outline-outline" src="/resources/person-circle-outline.svg"
            slot="start"></ion-icon>
          <ion-label>
            Account
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-icon name="contrast-outline" src="/resources/contrast-outline.svg" slot="start"></ion-icon>
          <ion-toggle>
            Darkmode
          </ion-toggle>
        </ion-item>
        <ion-item >
          <ion-icon name="hammer-outline" src="/resources/hammer-outline.svg" slot="start"></ion-icon>
          <ion-label>
            Version
          </ion-label>
          <ion-note color="medium" class="ion-text-wrap">1.0.0</ion-note>
        </ion-item>
        <ion-item button lines="none">
          <ion-icon name="settingsx-outline" src="/resources/settings-outline.svg" slot="start"></ion-icon>
          General
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
