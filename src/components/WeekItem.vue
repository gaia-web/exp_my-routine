<template>
  <ion-item>
    <div style="width: 100%">
      <div>{{ header }}</div>
      <div style="display: flex">
        <ion-button
          v-for="(_, i) in Array(7)"
          :key="i"
          fill="outline"
          style="flex: 1"
        ></ion-button>
      </div>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { IonButton, IonItem } from "@ionic/vue";
defineProps({
  header: String,
});
</script>

<style scoped></style>
