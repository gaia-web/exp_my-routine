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

      <div v-if="!routines.length">Click bottom right to add new routines.</div>
      <ion-list>
        <ion-reorder-group
          :disabled="!editViewEnabled"
          @ionItemReorder="handleReorder($event)"
        >
          <ion-item v-for="(routine, index) in routines">
            <ion-checkbox
              v-if="editViewEnabled"
              slot="start"
              v-model="routine.selected"
            ></ion-checkbox>
            <WeekItem
              v-if="routines.length"
              :key="index"
              :header="routine.name"
            />
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>
        </ion-reorder-group>
      </ion-list>
      <ion-fab
        slot="fixed"
        horizontal="end"
        vertical="bottom"
        @click="toggleEditView"
      >
        <ion-fab-button title="fab-list-toggle">
          <ion-icon :icon="pencil"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button title="Add" @click="openModal">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
          <ion-fab-button title="Delete" @click="deleteRoutines">
            <ion-icon :icon="trash"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
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
  modalController,
  IonReorder,
  IonFabList,
  IonReorderGroup,
  IonCheckbox,
} from "@ionic/vue";
import { pencil, calendar, trash, add } from "ionicons/icons";
import WeekItem from "@/components/WeekItem.vue";
import RoutineModal from "./RoutineModal.vue";
import { appStorage } from "@/utils/storage";
import { AppData, Routine } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { watch, onMounted, ref } from "vue";

type SelectableRoutine = Routine & {
  selected?: boolean;
};

const editViewEnabled = ref(false);
const routines = ref([] as SelectableRoutine[]);
let appDataRef = {} as AppData;

onMounted(async () => {
  const appData: AppData = await appStorage.get(STORAGE_KEYS.APP_DATA);

  appDataRef = appData ?? { routines: [] };
  routines.value = [...appDataRef?.routines] ?? [];
});

const handleReorder = async (event: CustomEvent) => {
  routines.value = event.detail.complete(routines.value);
};

const deleteRoutines = async () => {
  for (let i = routines.value.length - 1; i >= 0; i--) {
    if (routines.value[i].selected) {
      appDataRef.routines.splice(i, 1);
    }
  }
};

watch(routines, () => {
  appDataRef.routines = routines.value.map(
    ({ name }) => ({ name, records: [] } as Routine)
  );
});

watch(editViewEnabled, async (_, closed) => {
  if (closed) {
    await appStorage.set(STORAGE_KEYS.APP_DATA, appDataRef.routines = routines.value.map(
    ({ name }) => ({ name, records: [] } as Routine)
  ));
    routines.value = [...appDataRef?.routines] ?? [];
  }
});

const toggleEditView = async () => {
  editViewEnabled.value = !editViewEnabled.value;
};

const openModal = async () => {
  const modal = await modalController.create({
    component: RoutineModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === "confirm") {
    routines.value.push(createNewRoutine(data["name"]));
    appDataRef.routines.push(createNewRoutine(data["name"]));

    await appStorage.set(STORAGE_KEYS.APP_DATA, appDataRef);
  }
};

const createNewRoutine = (name: string): Routine => {
  return { name, records: [] };
};
</script>
