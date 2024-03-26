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
        name: "record",
        path: "record",
        component: () => import("@/views/RecordPage.vue"),
      },
      {
        name: "history",
        path: "history",
        component: () => import("@/views/HistoryPage.vue"),
      },
      {
        name: "settings",
        path: "settings",
        component: () => import("@/views/SettingsPage.vue"),
      },
      {
        name: "external",
        path: "external",
        component: () => import("@/views/ExternalPage.vue"),
        props: (route) => ({
          routineName: route.query.routineName,
          value: route.query.value,
        }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
