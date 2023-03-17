<template>
  <q-layout view="lHh lpr lFf">
    <header-cy />
    <q-page-container>
      <router-view />
    </q-page-container>

    <CustomFooter />
  </q-layout>
</template>

<script>
import CustomFooter from "src/components/CustomFooter.vue";
import { defineComponent, ref } from "vue";
import HeaderCy from "./HeaderCy.vue";
export default defineComponent({
  name: "MainLayout",
  components: { HeaderCy, CustomFooter },
  setup() {
    const tab = ref("");
    return { tab };
  },
});
</script>
<style lang="scss"></style>
