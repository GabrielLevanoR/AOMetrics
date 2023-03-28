<template>
  <q-page class="custom-page">
    <div class="container-top-fame q-pt-md q-pb-md">
      <div class="most-fame">
        <q-card class="card-section">
          <q-card-section class="custom-section">
            <span class="title">TOP FAME PVP KILLS</span>
            <q-select
              outlined
              v-model="selectedServer.top"
              :options="options"
              label="Server"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup() {
    const options = ref(["All", "West", "East"]);
    const selectedServer = reactive({ top: "All", recent: "All" });

    return { options, selectedServer };
  },
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
.custom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .q-select {
    min-width: 150px;
  }
  .q-input {
    width: 100%;
  }
}
.custom-page {
  display: flex;
  flex-direction: column;
  .most-fame {
    margin: 10px 15px 20px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .card-section {
      width: 100%;
      max-width: 1200px;
    }
  }
}
</style>
