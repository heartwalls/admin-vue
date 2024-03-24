<script setup lang="ts">
import { onMounted } from 'vue'
import { login } from '@/api/user'

onMounted(() => {
  login({ username: 'admin', password: '111111' })
})
</script>

<template>
  <div>
    <h1>全局测试</h1>
    <svg-icon name="home" color="red" width="48px" height="48px"></svg-icon>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $base-color;
  }
}
</style>
