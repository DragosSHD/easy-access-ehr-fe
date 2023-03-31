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
                   :status="formState.email.error"
                   :disabled="formIsLoading"/>
          <n-input v-model:value="formState.password.value"
                   type="password"
                   placeholder="Password"
                   :status="formState.password.error"
                   show-password-on="mousedown"
                   :disabled="formIsLoading"/>
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
import { setUser } from "../util/util.js";
import { useRouter } from "vue-router";

const formRef = ref(null);
const formState = reactive({
  email: {
    value: "",
    error: "",
    errorMessage: "",
  },
  password: {
    value: "",
    error: "",
    errorMessage: "",
  },
});
const formIsLoading = ref(false);
const router = useRouter();

async function handleSubmit() {
  formIsLoading.value = true;
  const user = await login(formState.email.value, formState.password.value);
  if(user) {
    console.log(user);
    setUser(user);
    await router.push("/home");
  }
  formIsLoading.value = false;
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