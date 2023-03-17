<script setup>
const props = defineProps({
  itemName: String,
  itemQuality: Number,
  itemCount: Number,
  showNumber: Boolean,
});
const createURLRender = (itemName, itemQuality = 0) => {
  return `https://render.albiononline.com/v1/item/${itemName}?quality=${itemQuality}`;
};
</script>
<template>
  <q-img
    :src="createURLRender(itemName, itemQuality)"
    :style="{ height: 100 + '%', 'max-width': 60 + 'px' }"
  >
    <template v-slot:loading>
      <q-spinner-grid color="orange" size="20px" />
    </template>
    <template v-slot:default>
      <div class="item-count" v-if="itemCount > 1 && showNumber === true">
        <span :style="{ 'font-size': 11 + 'px' }">{{ itemCount }}</span>
      </div>
    </template>
  </q-img>
</template>

<style lang="scss" scoped>
.item-count {
  background: transparent !important;
  border-radius: 50%;
  color: white;
  bottom: 9px !important;
  right: 9px !important;
  font-weight: bold;
  text-align: center;
  line-height: 17px;
  margin: 0;
  padding: 0;
  width: 18px;
  height: 18px;
}
</style>
