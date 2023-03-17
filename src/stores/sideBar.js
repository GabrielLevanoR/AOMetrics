import { defineStore } from "pinia";

export const sideBarBool = defineStore("sideBarBool", {
  state: () => ({
    stateSideBar: false,
  }),
  getters: {
    getSideBarState: (state) => state.stateSideBar,
  },
  actions: {
    open() {
      this.stateSideBar = true;
    },
    close() {
      this.stateSideBar = false;
    },
    toggleSidebar() {
      this.stateSideBar = !this.stateSideBar;
    },
  },
});
