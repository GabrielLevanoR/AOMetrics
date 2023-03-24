<template>
  <q-toggle
    v-model="toggleDarkMode"
    checked-icon="nightlight"
    color="black"
    unchecked-icon="brightness_5"
  />
</template>

<script>
import { useQuasar } from "quasar";
import { ref, watch, onMounted } from "vue";
export default {
  setup() {
    const $q = useQuasar();
    const toggleDarkMode = ref(false);
    const toggleLight = () => {
      $q.dark.set(toggleDarkMode.value);
      $q.localStorage.set("darkMode", toggleDarkMode.value);
    };
    watch(toggleDarkMode, () => {
      toggleLight();
    });
    onMounted(() => {
      toggleDarkMode.value = Boolean($q.localStorage.getItem("darkMode"));
    });

    return {
      toggleDarkMode,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.q-toggle__track) {
  height: 20px;
  margin-top: -3px;
  color: gray !important;
  border-radius: 15px;
}
</style>
