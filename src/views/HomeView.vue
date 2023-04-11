<template>
  <div class="home-layout">
    <header>
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <div class="header-item">
            <HamburgerButton />
          </div>
        </n-gi>
        <n-gi>
          <div class="header-item">

          </div>
        </n-gi>
        <n-gi>
          <div class="header-item">

          </div>
        </n-gi>
      </n-grid>
    </header>
    <n-layout has-sider>
      <n-layout-sider
          bordered
          collapse-mode="width"
          :width="240"
          :collapsed="collapsed"
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >
        <n-menu
            :collapsed="collapsed"
        />
      </n-layout-sider>
      <n-layout>
        <span>Content</span>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NGrid,
  NGi,
} from "naive-ui";
import { ref } from "vue";
import HamburgerButton from "../components/HamburgerButton.vue";

const collapsed = ref(false);

</script>

<style scoped>

header {
  background-color: #000;
  border-bottom: 1px solid #525252;
  height: 60px;
}

.header-item {
  height: 100%;
  display: flex;
  align-items: center;
}

.home-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>