<template>
  <q-layout view="lHh lpr lFf">
    <header-cy />
    <q-page-container>
      <router-view />
    </q-page-container>
    <CookiesRender />
    <CustomFooter />
  </q-layout>
</template>

<script>
import CookiesRender from "src/components/CookiesRender.vue";
import CustomFooter from "src/components/CustomFooter.vue";
import { defineComponent, ref } from "vue";
import HeaderCy from "./HeaderCy.vue";
export default defineComponent({
  name: "MainLayout",
  components: { HeaderCy, CustomFooter, CookiesRender },
  setup() {
    const tab = ref("");
    return { tab };
  },
});
</script>
<style lang="scss"></style>
