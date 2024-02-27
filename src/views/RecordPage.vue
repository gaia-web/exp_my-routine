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
      <div v-if="!routines.length">Click bottom right to add new routines.</div>
      <ion-list>
        <ion-reorder-group
          :diabled="false"
          @ionItemReorder="handleReorder($event)"
        >
            <!-- v-for="{ index, header } in routines.map((r, index) => {
              return { header: r.name, index };
            })" -->
          <!-- <ion-item
          >
            <ion-label> Item 1 </ion-label> -->
            <!-- <WeekItem v-if="routines.length" :key="index" :header="header" /> -->
            <!-- <ion-reorder></ion-reorder>
          </ion-item>
          <ion-item
          > -->
            <!-- <ion-label> Item 2 </ion-label> -->
            <!-- <WeekItem v-if="routines.length" :key="index" :header="header" /> -->
            <!-- <ion-reorder></ion-reorder> -->
          <!-- </ion-item> -->
        </ion-reorder-group>
      </ion-list>
      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button title="fab-list-toggle">
          <ion-icon :icon="pencil"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button title="Add" @click="openModal">
            <ion-icon :icon="pencil"></ion-icon>
          </ion-fab-button>
          <ion-fab-button title="Delete" @click="toggleDeleteView">
            <ion-icon :icon="close"></ion-icon>
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
} from "@ionic/vue";
import { pencil, calendar, close } from "ionicons/icons";
import WeekHeader from "@/components/WeekHeader.vue";
import WeekItem from "@/components/WeekItem.vue";
import RoutineModal from "./RoutineModal.vue";
import { appStorage } from "@/utils/storage";
import { AppData, Routine } from "@/utils/app-data";
import { STORAGE_KEYS } from "@/utils/constant";
import { watch, onMounted, ref } from "vue";

const selectedIndex = ref([] as number[]);
const deleteViewEnabled = ref(false);
const routines = ref([] as Routine[]);
let appDataRef = {} as AppData;

console.log(deleteViewEnabled.value);

onMounted(async () => {
  const appData: AppData = await appStorage.get(STORAGE_KEYS.APP_DATA);

  appDataRef = appData ?? { routines: [] };
  routines.value = appDataRef?.routines ?? [];
});

const handleReorder = (event: CustomEvent) => {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log("Dragged from index", event.detail.from, "to", event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
};

const toggleDeleteView = () => {
  console.log("toggle clicked");
  deleteViewEnabled.value = true;
  console.log(2, deleteViewEnabled.value);
};

watch(deleteViewEnabled, () => {
  // what?
  console.log(3, deleteViewEnabled.value);
});

console.log(4, deleteViewEnabled.value);

const openModal = async () => {
  const modal = await modalController.create({
    component: RoutineModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === "confirm") {
    const newRoutine: Routine = { name: data["name"], records: [] };
    routines.value.push(newRoutine);

    await appStorage.set(STORAGE_KEYS.APP_DATA, appDataRef);
  }
};
</script>
