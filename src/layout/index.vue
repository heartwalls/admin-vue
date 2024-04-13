<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
</script>

<template>
  <div class="layout_container">
    <!--  左侧菜单栏  -->
    <div class="layout_sidebar">
      <Logo></Logo>
      <!-- 菜单组件  -->
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="white">
          <!-- 根据路由动态生成菜单 -->
          <Menu></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  顶部导航栏  -->
    <div class="layout_topbar">1</div>
    <!--  内容展示区  -->
    <div class="layout_content">
      <p style="height: 100px">测试段落</p>
    </div>
    <!-- <div class="layout_footer"></div> -->
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_sidebar {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-bg-color;
    color: white;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-height);
    }
  }

  .layout_topbar {
    // 固定定位
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-top-height;
    background: #67c23a;
  }

  .layout_content {
    // 绝对定位
    position: absolute;
    top: $base-top-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-top-height);
    padding: $main-area-padding;
    background: #d1edc4;
  }
}
</style>
