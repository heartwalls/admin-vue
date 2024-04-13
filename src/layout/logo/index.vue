<script setup lang="ts">
import setting from '@/setting'
</script>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: $base-logo-padding;
  img {
    width: $base-logo-img-width;
    height: $base-logo-img-height;
  }
  p {
    font-size: $base-logo-title-size;
    margin-left: 10px;
    font-family: 方正大黑简体, serif;
  }
}
</style>
