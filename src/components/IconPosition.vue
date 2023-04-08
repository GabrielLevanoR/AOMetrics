<script setup>
const props = defineProps({ position: Number });
const order = Math.sign(props.position);
let icon = "fa-solid ";
switch (order) {
  case -1:
    icon += "fa-angles-down";
    break;
  case 0:
    icon += "fa-equals";
    break;
  case 1:
    icon += "fa-angles-up";
    break;
  default:
    break;
}
</script>
<template>
  <div class="position-guild">
    <q-icon :name="icon" color="orange" size="1.3rem" />
    <div v-if="order !== 0">{{ position }}</div>
  </div>
</template>
<style lang="scss" scoped>
body.body--dark {
  .q-icon {
    color: #ff9800 !important;
  }
}
.position-guild {
  text-align: center;
}
</style>
