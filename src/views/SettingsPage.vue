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
          <ion-label> Account </ion-label>
        </ion-item>
        <ion-item width="full">
          <ion-icon slot="start" :icon="contrastOutline"></ion-icon>

          <ion-select
            label="Color Theme"
            aria-label="theme"
            interface="popover"
            :value="selectValue"
            @ionChange="selectChanges($event)"
          >
            <ion-select-option value="system">System</ion-select-option>
            <ion-select-option value="dark">Dark</ion-select-option>
            <ion-select-option value="light">Light</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="hammerOutline"></ion-icon>
          <ion-label> Version </ion-label>
          <ion-note slot="end" color="medium">1.0.0</ion-note>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonLabel,
  IonItem,
  SelectCustomEvent,
  IonSelectOption,
  IonIcon,
  IonNote,
  IonList,
} from "@ionic/vue";
import {
  contrastOutline,
  hammerOutline,
  personCircleOutline,
  settingsOutline,
} from "ionicons/icons";
import { ref } from "vue";

const selectValue = ref(localStorage.getItem("theme") ?? "system");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const toggleDarkTheme = () => {
  const currentThemeMode = localStorage.getItem("theme");
  if (currentThemeMode === "system") {
    document.body.classList.toggle("dark", prefersDark.matches);
  } else {
    document.body.classList.toggle("dark", currentThemeMode === "dark");
  }
};

toggleDarkTheme();

prefersDark.addEventListener("change", () => toggleDarkTheme());

const selectChanges = (ev: SelectCustomEvent) => {
  localStorage.setItem("theme", ev.detail.value);
  toggleDarkTheme();
};
</script>
