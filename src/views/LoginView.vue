<template>
  <div class="container">
    <div class="login-view">
      <h1 style="margin-bottom: 0; text-align: center">{{ appTitle }}</h1>
      <p style="margin-bottom: 50px; text-align: center">{{ appVersion }}</p>
      <p>Log in to your account</p>
      <form ref="formRef" @submit.prevent="handleSubmit">
        <n-space vertical size="large">
          <n-input v-model:value="formState.email.value"
                   placeholder="Email"
                   :status="formState.email.status"
                   @focus="() => formState.email.status = ''"
                   :disabled="formIsLoading"/>
          <n-input v-model:value="formState.password.value"
                   type="password"
                   placeholder="Password"
                   :status="formState.password.status"
                   @focus="() => formState.password.status = ''"
                   show-password-on="mousedown"
                   :disabled="formIsLoading"
                   @keydown.enter="handleSubmit"/>
          <n-button type="primary" @click="handleSubmit" block>Log in</n-button>
          <div class="bottom-btn-container">
            <RouterLink to="/register">
              <n-button type="default" block>Forgot password</n-button>
            </RouterLink>
            <RouterLink to="/register">
              <n-button type="default" block>Register</n-button>
            </RouterLink>
          </div>
        </n-space>
      </form>
    </div>
  </div>
</template>

<script setup>
import { appTitle, appVersion } from "../util/constants.js";
import { NSpace, NInput, NButton } from "naive-ui";
import { reactive, ref } from "vue";
import { login } from "../util/api.js";
import { setUser, validateEmailAddress } from "../util/util.js";
import { useRouter } from "vue-router";
import routeNames from "../router/routeNames.js";

const formRef = ref(null);
const formState = reactive({
  email: {
    value: "",
    status: "",
    errorMessage: "",
  },
  password: {
    value: "",
    status: "",
    errorMessage: "",
  },
});
const formIsLoading = ref(false);
const router = useRouter();

async function handleSubmit() {
  formIsLoading.value = true;
  await localLogin();
  formIsLoading.value = false;
}

async function localLogin() {
  if (!validateEmailAddress(formState.email.value)) {
    formState.email.status = "error";
    return;
  }
  if (!formState.password.value) {
    formState.password.status = "error";
    return;
  }
  const userResponse = await login(formState.email.value, formState.password.value);
  if(userResponse?.error) {
    return;
  }
  if(userResponse) {
    setUser(userResponse);
    await router.push({ name: routeNames.HOME });
  }
}

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

.bottom-btn-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
}

.bottom-btn-container > * {
  flex-grow: 1;
  width: 0;
}

</style>