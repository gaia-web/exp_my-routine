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
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Appearance</ion-label>
          </ion-item-divider>
          <ion-item width="full">
            <ion-icon slot="start" :icon="contrastOutline"></ion-icon>
            <ion-select
              label="Color Theme"
              aria-label="theme"
              interface="popover"
              v-model="themeType"
            >
              <ion-select-option value="system">System</ion-select-option>
              <ion-select-option value="dark">Dark</ion-select-option>
              <ion-select-option value="light">Light</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>About</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-icon slot="start" :icon="hammerOutline"></ion-icon>
            <ion-label> Version </ion-label>
            <ion-note slot="end" color="medium">0.0.0</ion-note>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Data</ion-label>
          </ion-item-divider>
          <ion-item button @click="importAppData">
            <ion-icon slot="start" :icon="openOutline"></ion-icon>
            <ion-label> Import App Data </ion-label>
          </ion-item>
          <ion-item button @click="exportAppData">
            <ion-icon slot="start" :icon="saveOutline"></ion-icon>
            <ion-label> Export App Data </ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon slot="start" :icon="syncOutline"></ion-icon>
            <ion-label> Sync App Data </ion-label>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Other</ion-label>
          </ion-item-divider>
          <ion-item button>
            <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
            <ion-label> Account </ion-label>
          </ion-item>
          <ion-item button lines="none">
            <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
            General
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Experimental</ion-label>
          </ion-item-divider>
          <ion-item button @click="createNFCTag" :disabled="!nfcSupported">
            <ion-icon slot="start" :icon="pricetagOutline"></ion-icon>
            <ion-label> Create NFC tag </ion-label>
          </ion-item>
        </ion-item-group>
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
  IonItemDivider,
  IonItemGroup,
  IonSelectOption,
  IonIcon,
  IonNote,
  IonList,
  alertController,
} from "@ionic/vue";
import {
  contrastOutline,
  hammerOutline,
  saveOutline,
  openOutline,
  personCircleOutline,
  settingsOutline,
  syncOutline,
  pricetagOutline,
} from "ionicons/icons";
import { ref, watch } from "vue";
import { STORAGE_KEYS } from "../utils/constant";
import { updateTheme } from "../utils/theme";
import { appStorage } from "@/utils/storage";
import { AppData } from "@/utils/app-data";

const nfcSupported = ref(!!window.NDEFReader);

const themeType = ref(
  localStorage.getItem(STORAGE_KEYS.THEME_TYPE) ?? "system"
);
watch(themeType, async () => {
  await appStorage.set(STORAGE_KEYS.THEME_TYPE, themeType.value);
  updateTheme();
});

const importAppData = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.addEventListener("input", async () => {
    const file = inputElement.files?.[0];
    if (!file) {
      return;
    }
    // TODO add validation
    await appStorage.set(STORAGE_KEYS.APP_DATA, JSON.parse(await file.text()));
    // TODO use ionic alert and show errors if happend
    alert("Imported");
  });
  inputElement.click();
  inputElement.remove();
};

const exportAppData = async () => {
  const appData: AppData = await appStorage.get(STORAGE_KEYS.APP_DATA);
  const blob = new Blob([JSON.stringify(appData)]);
  const aElement = document.createElement("a");
  aElement.href = URL.createObjectURL(blob);
  aElement.download = "AppData.json";
  aElement.click();
};

const createNFCTag = async () => {
  const alert = await alertController.create({
    header: "Create a NFC Tag",
    inputs: [
      {
        name: "name",
        placeholder: "Routine Name",
        type: "text",
      },
    ],
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Confirm",
        role: "confirm",
        handler: async ({ name }) => {
          const records = [
            {
              recordType: "url",
              data: `${window.location.origin}/nfc/${name}`,
            },
          ];
          const reader = new NDEFReader();
          const abortController = new AbortController();

          reader.scan({ signal: abortController.signal });

          try {
            await reader.write(
              { records },
              {
                overwrite: true,
              }
            );

            setTimeout(() => abortController.abort(), 3000);
            globalThis.alert("done writing tag");
          } catch (e) {
            globalThis.alert("error writing tag");
          }
        },
      },
    ],
  });
  await alert.present();
};
</script>
