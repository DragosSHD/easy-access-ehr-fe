<template>
  <div class="container">
    <div class="register-view">
      <n-form ref="formRef"
              :model="formValue"
              :rules="rules"
              style="width: 100%"
              class="mb-3">
        <n-form-item label="Email" path="email">
          <n-input
              v-model:value="formValue.email"
              type="text"
              placeholder=""
          />
        </n-form-item>
        <n-grid cols="1 s:2" :x-gap="20" responsive="screen">
          <n-form-item-gi label="First Name" path="firstName">
            <n-input
                v-model:value="formValue.firstName"
                type="text"
                placeholder=""/>
          </n-form-item-gi>
          <n-form-item-gi label="Last Name" path="lastName">
            <n-input
                v-model:value="formValue.lastName"
                type="text"
                placeholder=""/>
          </n-form-item-gi>
        </n-grid>
        <n-form-item label="Birth Date" path="birthDate">
          <n-date-picker
              v-model:value="formValue.birthDate"
              type="date"
              style="width: 100%"
          />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input
              v-model:value="formValue.password"
              type="password"
              placeholder=""
              show-password-on="mousedown"
          />
        </n-form-item>
        <n-form-item label="Repeat Password" path="repeatPassword">
          <n-input
              v-model:value="formValue.repeatPassword"
              type="password"
              :disabled="formValue.password === null"
              placeholder=""
          />
        </n-form-item>
        <n-button type="primary" block @click="handleSubmit">Register</n-button>
      </n-form>
      <p>Already have an account? <RouterLink :to="{name: routeNames.LOGIN}">Log In</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NGrid,
  NFormItemGi,
  NDatePicker, useMessage,
} from "naive-ui";

import { reactive, ref } from "vue";
import { register } from "../util/api.js";
import { useRouter } from "vue-router";
import routeNames from "../router/routeNames.js";

const formRef = ref(null);
const formValue = reactive({
  email: null,
  firstName: null,
  lastName: null,
  birthDate: null,
  password: null,
  repeatPassword: null,
});
const rules = {
  email: {
    required: true,
    validator: (rule, value) => {
      if (!value) {
        return new Error("Email is required");
      }
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (reg.test(value)) {
        return true;
      }
      return new Error("Email is not valid");
    },
    trigger: ["blur", "input"],
  },
  firstName: {
    required: true,
    message: "First name is required",
    trigger: "blur",
  },
  lastName: {
    required: true,
    message: "Last name is required",
    trigger: "blur",
  },
  birthDate: {
    required: true,
    type: "number",
    message: "Birth date is required",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "Password is required",
    trigger: "blur",
  },
  repeatPassword: {
    required: true,
    validator: (rule, value) => {
      if (value !== formValue.password) {
        return new Error("Passwords do not match");
      }
      return true;
    },
    trigger: "blur",
  },
};
const router = useRouter();
const message = useMessage();

async function handleSubmit() {
  formRef.value.validate(async (errors) => {
    if (errors) {
      return;
    }
    const data = {
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      birthDate: new Date(formValue.birthDate).toUTCString(),
      password: formValue.password,
    };
    const res = await register(data);
    if (res && !res.error) {
      await router.push({name: routeNames.LOGIN});
      message.success("Registration successful");
    }
  });
}

</script>

<style scoped>

.register-view {
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 80vh;
}

</style>