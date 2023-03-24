<template>
  <footer>
    <div>
      <div class="gray-bold-custom">
        Beyond the Veil Patch 6 - Ver. 22.060.1 - March 13, 2023
      </div>
      <hr />
      <span class="gray-bold-custom">Released under the </span>
      <span class="white-bold-custom"
        ><a href="https://opensource.org/license/mit/">MIT License</a></span
      >
      <div class="gray-bold-custom">Copyright © 2023 Albion Metrics</div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
body.body--dark {
  footer{
    background: $darkMode--bg2;
  }
}
footer {
  background: #24252a;
  min-height: 90px;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 15px;
  font-size: 13px;
  font-weight: bold;
  div {
    .gray-bold-custom {
      color: rgb(182, 182, 182);
    }
    .white-bold-custom, a {
      color: rgb(255, 255, 255) !important;
      text-decoration: none;
    }
  }
}
</style>
