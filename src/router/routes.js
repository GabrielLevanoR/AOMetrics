const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/IndexPage.vue"),
        name: "Index",
      },
      {
        path: "/battles",
        component: () => import("pages/BattlesCy.vue"),
        name: "Battles",
      },
      {
        path: "/battle/:id",
        component: () => import("pages/BattleSelected.vue"),
        name: "BattleSelected",
      },
      {
        path: "/crystal",
        component: () => import("pages/CrystalCy.vue"),
        name: "Crystal",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/farming",
        component: () => import("pages/FarmingCy.vue"),
        name: "Farming",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/gold",
        component: () => import("pages/GoldCy.vue"),
        name: "Gold",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/prices",
        component: () => import("pages/PricesCy.vue"),
        name: "Prices",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/pvp",
        component: () => import("pages/PvpKills.vue"),
        name: "Pvp",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/refining",
        component: () => import("pages/RefiningCy.vue"),
        name: "Refining",
        redirect: {
          name: "Error404",
        },
      },
      {
        path: "/weight",
        component: () => import("pages/WeightCy.vue"),
        name: "Weight",
        redirect: {
          name: "Error404",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "Error404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
