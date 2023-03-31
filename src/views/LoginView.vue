<template>
  <n-space vertical size="medium">
    <n-layout>
      <n-layout-content class="container">
        <div class="login-view">
          <h1 style="margin-bottom: 0; text-align: center">{{ appTitle }}</h1>
          <p style="margin-bottom: 50px; text-align: center">{{ appVersion }}</p>
          <p>Log in to your account</p>
          <n-space vertical size="large">
            <n-input placeholder="Email" />
            <n-input placeholder="Password" />
            <n-space justify="end">
              <n-button type="default">Sign up</n-button>
              <n-button type="primary">Log in</n-button>
            </n-space>
          </n-space>
        </div>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script setup>
import { appTitle, appVersion } from "../util/constants.js";
import { NSpace, NLayout, NLayoutContent, NInput, NButton } from "naive-ui";

</script>

<style scoped>

.login-view {
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 80vh;
}

.login-view > * {
  width: 100%;
}

</style>