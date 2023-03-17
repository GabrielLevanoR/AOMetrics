<template>
  <div>
    <q-icon
      name="fa-solid fa-bars"
      color="black"
      size="30px"
      @click="toggleSidebar"
      v-show="iconBool"
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
            style="height: 72px"
          />
          <div class="close-btn">
            <q-icon
              name="fa-solid fa-xmark"
              color="black"
              size="20px"
              @click="toggleSidebar"
            />
          </div>
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
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 0.5rem 1rem;
}

.header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  margin-right: 1rem;
}

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
  min-height: 86px;
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

  .close-btn {
    padding: 10px 20px;
    i {
      cursor: pointer;
      border: 3px solid rgba(255, 153, 0, 0.541);
      color: rgba(192, 122, 16, 0.897) !important;
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
        background-color: rgba(230, 139, 3, 0.151);
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
