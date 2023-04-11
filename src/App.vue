<template>
  <n-config-provider :theme="darkTheme" style="height: 100%">
    <n-loading-bar-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
  import { darkTheme, NConfigProvider, NMessageProvider, NLoadingBarProvider } from "naive-ui";
  import { onMounted } from "vue";
  import { appTitle } from "./util/constants.js";

  onMounted(() => {
    document.title = appTitle;
  })
</script>

