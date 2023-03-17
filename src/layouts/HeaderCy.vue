<template>
  <div>
    <q-header elevated class="flex row">
      <q-toolbar class="toolbar-cypher">
        <div class="flex row items-center" style="width: 288px">
          <img
            v-if="!iconBool"
            src="../assets/images/albionCypherBlack.png"
            style="height: 90px; cursor: pointer"
            @click="returnToIndex"
          />
          <img
            v-else
            src="~assets/images/albionCypherWithoutLetters.png"
            style="height: 69px; cursor: pointer"
            @click="returnToIndex"
          />
        </div>
        <q-space />
        <q-tabs v-model="tab" shrink stretch class="tabs-header">
          <div class="flex row items-center" style="height: 100%">
            <nav class="nav-cypher" role="navigation">
              <ul class="navigation-cypher">
                <li class="tier1-tap" v-for="newTab in tabs" :key="newTab">
                  <q-btn-dropdown
                    :label="newTab.dropName"
                    :disable="newTab.disable"
                  >
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        v-for="routeTab in newTab.routeTab"
                        :key="routeTab"
                      >
                        <q-item-section>
                          <q-item-label>
                            <q-route-tab
                              :name="routeTab.name"
                              :label="routeTab.label"
                              :to="{ name: routeTab.name }"
                            />
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </li>
              </ul>
            </nav>
          </div>
        </q-tabs>
        <SideBar :items="tabs" :iconBool="iconBool" />
      </q-toolbar>
    </q-header>
  </div>
</template>
<script>
import SideBar from "src/components/SideBar.vue";
import { sideBarBool } from "../stores/sideBar";
import { useRouter } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup() {
    const showSidebar = sideBarBool();
    const route = useRouter();
    const tab = ref("");
    const tabs = ref([
      {
        dropName: "Killboard",
        disable: false,
        routeTab: [
          //{ name: "Pvp", label: "PVP Kills" },
          { name: "Battles", label: "Battles" },
          //{ name: "Crystal", label: "Crystal" },
        ],
      },
      {
        dropName: "Market",
        disable: true,
        routeTab: [
          { name: "Prices", label: "Prices" },
          { name: "Gold", label: "Gold" },
        ],
      },
      {
        dropName: "Calculators",
        disable: true,
        routeTab: [
          { name: "Farming", label: "Farming" },
          { name: "Refining", label: "Refining" },
        ],
      },
    ]);
    const mobileIcon = () => {
      if (window.innerWidth > 800) {
        showSidebar.close();
        return false;
      } else {
        return true;
      }
    };
    const iconBool = ref(mobileIcon());
    const returnToIndex = () => {
      route.push({ name: "Index" });
    };
    onMounted(() => {
      window.addEventListener("resize", () => {
        iconBool.value = mobileIcon();
      });
    });
    return { tab, iconBool, tabs, returnToIndex };
  },
  components: { SideBar },
});
</script>
<style lang="scss">
.q-header {
  height: 86px;
  background-color: white;
}
.q-menu {
  .q-list {
    .q-item {
      //margin: 0;
      padding: 0;
      .q-tab {
        width: 100%;
        padding: 15px 5px;
      }
    }
  }
}
.toolbar-cypher {
  padding: 0 30px;
}
.nav-cypher {
  display: inline-block;
  background: transparent;
  height: 100%;
}
.navigation-cypher {
  margin: 0;
  padding: 0;
  height: 100%;
  display: inline-block;
  .tier1-tap {
    height: 100%;
    display: inline-block;
    position: relative;
    .q-btn {
      width: 100%;
      height: 100%;
      border-radius: 0;
      color: black;
      font-weight: bold;
    }
    .q-btn::before {
      box-shadow: none;
    }
    .q-icon {
      display: none;
    }
    .q-btn__content {
      padding: 0 10px;
    }
  }
}

@media screen and (max-width: 800px) {
  .tabs-header {
    display: none;
  }
}
</style>
