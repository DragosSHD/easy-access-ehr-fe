<template>
  <n-config-provider :theme="darkTheme" style="height: 100%">
    <RouterView />
  </n-config-provider>
</template>

<script setup>
  import { darkTheme, NConfigProvider } from "naive-ui";
</script>

