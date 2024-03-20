import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/record",
      },
      {
        path: "record",
        component: () => import("@/views/RecordPage.vue"),
      },
      {
        path: "history",
        component: () => import("@/views/HistoryPage.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/SettingsPage.vue"),
      },
      {
        path: "nfc",
        component: () => import("@/views/NFCPage.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
