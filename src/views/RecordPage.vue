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
      <swiper-container virtual="true" :initial-slide="9">
        <ion-item style="position: sticky; z-index: 10; top: 0">
          <WeekHeader />
        </ion-item>
        <swiper-slide v-for="i in 10" :key="i">
          <ion-list>
            <div v-if="appData?.routines?.length <= 0">
              Click bottom right + to add new routine.
            </div>
            <ion-reorder-group
              :disabled="!editingViewEnabled"
              @ionItemReorder="handleReorder"
            >
              <ion-item
                v-for="(routine, index) in appData.routines"
                :key="routine.name"
              >
                <ion-checkbox
                  v-if="editingViewEnabled"
                  slot="start"
                  v-model="routineSelections[index]"
                ></ion-checkbox>
                <WeekItem
                  v-model:routine="(appData as AppData).routines[index]"
                />
                <ion-reorder slot="end"></ion-reorder>
              </ion-item>
            </ion-reorder-group>
          </ion-list>
        </swiper-slide>
      </swiper-container>
      <ion-fab
        slot="fixed"
        horizontal="end"
        vertical="bottom"
        @click="toggleEditingView"
      >
        <ion-fab-button title="fab-list-toggle">
          <ion-icon :icon="pencil"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button title="Add" @click="addRoutine">
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
  IonReorder,
  IonFabList,
  IonReorderGroup,
  IonCheckbox,
  ItemReorderEventDetail,
  alertController,
} from "@ionic/vue";
import { pencil, calendar, trash, add } from "ionicons/icons";
import WeekHeader from "@/components/WeekHeader.vue";
import WeekItem from "@/components/WeekItem.vue";
import { appStorage } from "@/utils/storage";
import { AppData, INITIAL_APP_DATA, Routine } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { watch, onMounted, ref } from "vue";
import { deepUnref } from "vue-deepunref";
import { register as registerSwiper } from "swiper/element/bundle";

registerSwiper();

const appData = ref<AppData>(INITIAL_APP_DATA);
const editingViewEnabled = ref(false);
const routineSelections = ref<boolean[]>([]);

watch(editingViewEnabled, async (value) => {
  if (value) {
    routineSelections.value = new Array(appData.value.routines.length);
    return;
  }
});

watch(
  appData,
  async () => {
    await saveAppData();
  },
  { deep: true }
);

onMounted(async () => {
  appData.value = await appStorage.get(STORAGE_KEYS.APP_DATA);
});

const toggleEditingView = () => {
  editingViewEnabled.value = !editingViewEnabled.value;
};

const addRoutine = async () => {
  const alert = await alertController.create({
    header: "Adding a new routine",
    message: "Enter the routine name",
    inputs: [{ name: "name", type: "text", placeholder: "Routine Name" }],
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Add",
        role: "confirm",
        handler: ({ name }) => {
          const routine = createNewRoutine(name);
          appData.value?.routines.push(routine);
        },
      },
    ],
  });

  await alert.present();
};

const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
  const { from, to } = event.detail;
  routineSelections.value.splice(
    to,
    0,
    routineSelections.value.splice(from, 1)[0]
  );
  appData.value.routines = event.detail.complete(appData.value?.routines);
};

const deleteRoutines = () => {
  appData.value.routines = appData.value.routines.filter(
    (_, i) => !routineSelections.value[i]
  );
};

const createNewRoutine = (name: string): Routine => {
  return { name, records: {} };
};

const saveAppData = async () => {
  await appStorage.set(STORAGE_KEYS.APP_DATA, deepUnref(appData));
};
</script>
