<template>
  <div class="container">
    <div class="register-view">
      <n-form style="width: 100%">
        <n-form-item label="Email">
          <n-input
              type="text"
              placeholder=""
          />
        </n-form-item>
        <n-grid cols="1 s:2" :x-gap="20" responsive="screen">
          <n-form-item-gi label="First Name">
            <n-input
              type="text"
              placeholder=""/>
          </n-form-item-gi>
          <n-form-item-gi label="Last Name">
            <n-input
              type="text"
              placeholder=""/>
          </n-form-item-gi>
        </n-grid>
        <n-form-item label="Birth Date">
          <n-date-picker
            type="date"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item label="Password">
          <n-input
            type="password"
            placeholder=""
          />
        </n-form-item>
        <n-form-item label="Repeat Password">
          <n-input
            type="password"
            placeholder=""
          />
        </n-form-item>
        <n-button type="primary" block>Register</n-button>
      </n-form>
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
  NDatePicker,
} from "naive-ui";


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