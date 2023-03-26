<template>
  <div class="cookie" v-if="show">
    <div class="cookie-notification">
      <div class="container q-mb-sm">
        This website uses cookies to provide services and analyze information
        about visitors. By continuing to browse the site, you agree to the use
        of cookies.
      </div>
      <div class="options">
        <q-btn
          color="orange-8"
          label="I Agree"
          size="12px"
          class="q-mr-sm"
          @click="hide"
        />
        <q-btn color="orange-10" label="More info" size="12px" @click="info" />
      </div>
    </div>
    <div class="pilar"></div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const show = ref(false);
    const $q = useQuasar();
    const hide = () => {
      $q.localStorage.set("cookiesAccepted", true);
      const elemento = document.querySelector(".cookie");
      elemento.classList.add("hide");
      setTimeout(() => {
        show.value = false;
      }, 1000);
    };
    const info = () => {
      window.open("https://policies.google.com/technologies/cookies", "_blank");
    };
    onMounted(() => {
      show.value =
        $q.localStorage.getItem("cookiesAccepted") === null
          ? true
          : !$q.localStorage.getItem("cookiesAccepted");
    });
    return {
      show,
      hide,
      info,
    };
  },
};
</script>

<style lang="scss" scoped>
body.body--dark {
  .cookie {
    background: $darkMode--bg2;
    .cookie-notification {
      .options {
        color: white !important;
      }
    }
  }
}
.cookie {
  border: 1px solid $divider-dark;
  border-radius: 5px;
  background: white;
  position: fixed;
  bottom: 15px;
  right: 0;
  z-index: 9999;
  display: flex;
  margin: 10px;
  opacity: 1;
  transition: opacity 1s ease;
  .cookie-notification {
    padding: 15px;
    max-width: 590px;
    .options {
      display: flex;
    }
  }
}
.hide {
  opacity: 0;
}
.pilar {
  background-color: rgb(209, 112, 0);
  width: 10px;
  min-height: 100%;
}
</style>
