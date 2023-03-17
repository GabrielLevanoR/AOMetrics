<template>
  <div>
    <span class="clipboard-color" @click="toClipBoard(textToDisplay)">{{
      textToDisplay
    }}</span>
    <q-tooltip>{{ copy }}</q-tooltip>
  </div>
</template>

<script>
import { ref } from "vue";
import { copyToClipboard } from "quasar";
export default {
  props: {
    textToDisplay: { required: true },
  },
  setup() {
    const copy = ref("Copy to clipboard");
    const toClipBoard = (text) => {
      copyToClipboard(text)
        .then(() => {
          copy.value = "¡Copied successfully!";
          setTimeout(() => {
            copy.value = "Copy to clipboard";
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return { toClipBoard, copy };
  },
};
</script>

<style lang="scss" scoped>
.clipboard-color {
  color: #e9b313;
  cursor: pointer;
}
</style>
