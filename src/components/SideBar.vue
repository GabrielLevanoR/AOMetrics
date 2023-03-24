<template>
  <div>
    <q-icon
      name="fa-solid fa-bars"
      color="black"
      size="30px"
      @click="toggleSidebar"
      v-show="iconBool"
      style="cursor: pointer"
    />
    <div
      class="back-close"
      :class="{ visible: showSidebar.stateSideBar }"
      @click="handleClick"
    >
      <div
        class="asideCustom"
        ref="asideCustom"
        :class="{ 'aside-visible': showSidebar.stateSideBar }"
      >
        <div class="header-side">
          <img
            src="~assets/images/albionCypherWithoutLetters.png"
            style="height: 50px"
          />
          <div class="close-btn">
            <q-icon
              name="fa-solid fa-xmark"
              size="20px"
              @click="toggleSidebar"
            />
          </div>
        </div>
        <div class="appearence-dark">
          <span>Appearence</span> <DarkModeToggle />
        </div>

        <div class="list-navigation">
          <ul v-for="(item, index) in items" :key="item">
            <div v-if="!item.disable">
              <div
                class="header-tab"
                @click="toggleArrow(index)"
                :class="{ 'disable-tab': item.disable }"
              >
                <div>
                  <span>{{ item.dropName }}</span>
                </div>
                <div>
                  <q-icon
                    name="fa-solid fa-caret-down"
                    size="20px"
                    :class="{ 'arrow-up': arrows[index] }"
                  />
                </div>
              </div>
              <li
                :class="{ 'show-tabs': !arrows[index] }"
                v-for="newTab in item.routeTab"
                :key="newTab"
                @click="redirect(newTab.name)"
              >
                <div class="route-to">{{ newTab.label }}</div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import { sideBarBool } from "../stores/sideBar";
import { useRouter } from "vue-router";
import DarkModeToggle from "./darkModeToggle.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    iconBool: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup() {
    const route = useRouter();
    const asideCustom = ref(null);
    const showSidebar = sideBarBool();
    const arrows = ref([true, true, true]);
    const toggleSidebar = () => {
      showSidebar.toggleSidebar();
    };
    const handleClick = () => {
      nextTick(() => {
        const rect = asideCustom.value.getBoundingClientRect();
        if (!rect) {
          return;
        }
        const innerBoxRight = rect.right;
        const innerBoxBottom = rect.bottom;
        const clickX = event.clientX;
        const clickY = event.clientY;
        if (clickX > innerBoxRight || clickY > innerBoxBottom) {
          showSidebar.close();
        }
      });
    };
    const redirect = (routeName) => {
      route.push({ name: routeName });
    };
    const toggleArrow = (i) => {
      arrows.value[i] = !arrows.value[i];
    };
    return {
      arrows,
      toggleArrow,
      redirect,
      asideCustom,
      handleClick,
      showSidebar,
      toggleSidebar,
    };
  },
  components: { DarkModeToggle },
};
</script>

<style scoped lang="scss">
.back-close {
  background-color: #3b3b3b63;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition-duration: 0.3s ease-in-out;
  transform: translateX(-100%);
}
.aside-visible {
  transform: translateX(0) !important;
}
.header-side {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  img {
    margin-left: 30px;
  }
}
.asideCustom {
  background-color: white;
  width: 350px;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  .appearence-dark {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    color: black;
    border-top: 1px solid rgb(182, 182, 182);
    border-bottom: 1px solid rgb(182, 182, 182);
  }
  .close-btn {
    padding: 10px 20px;
    i {
      cursor: pointer;
      border: 2px solid rgb(182, 182, 182);
      color: rgb(143, 143, 143);
      border-radius: 50%;
      padding: 5px;
    }
    i:hover {
      background-color: rgba(226, 226, 226, 0.562);
    }
  }
  .list-navigation {
    color: black;
    margin: 0;
    padding: 0;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 17px;
      .header-tab {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: bold;
        padding: 10px 20px;
        cursor: pointer;
        background-color: rgb(241, 241, 241);
        .arrow-up {
          transform: rotate(-180deg);
        }
      }
      li {
        padding: 10px 20px;
        cursor: pointer;
        .route-to {
          color: black;
          text-decoration: none;
        }
      }
      li:hover {
        font-weight: bold;
      }
      .show-tabs {
        display: none;
      }
    }
  }
}
.visible {
  display: flex;
  transform: translateX(0) !important;
}
@media screen and (min-width: 801px) {
  .q-icon {
    display: none;
  }
}
@media screen and (max-width: 560px) {
  .asideCustom {
    width: 100%;
  }
}
</style>
