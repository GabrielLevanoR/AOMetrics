<template>
  <div class="no-results">
    <div class="color-text">Something went wrong.</div>
    <div>The search returned no results.</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-results {
  min-width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 23px;
  padding: 10px;
  .color-text {
    color: orange;
  }
}
</style>
