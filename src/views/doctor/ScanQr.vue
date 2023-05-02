<template>
  <div>
    <qrcode-stream @decode="onDecode"
                   v-if="showQrComponent"
                   @init="onInit"/>
    <n-alert title="Error" type="error" v-if="errorMessage">
      {{ errorMessage }}
    </n-alert>
    <n-alert title="Success" type="success" v-if="successMessage">
      {{ successMessage }}
    </n-alert>
    <div v-if="successMessage || errorMessage"
         style="display: flex; padding: 15px 5px; justify-content: center; align-items: center">
      <n-button type="primary" @click="resetPage">
        Scan new QR code
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader';
import { useMessage, NAlert, NButton } from 'naive-ui';
import { ref } from "vue";
import { grantAuthorization } from "../../util/api.js";

const message = useMessage();
const showQrComponent = ref(true);
const errorMessage = ref("");
const successMessage = ref("");

async function onDecode (content) {
  if(!content) return;
  const authorizationToken = content;
  showQrComponent.value = false;
  const authorizationRes = await grantAuthorization({authorizationToken});
  if(authorizationRes?.error) {
    errorMessage.value = authorizationRes.error;
    return;
  }
  successMessage.value = "Authorization granted.";
}

async function onInit (promise) {
  try {
    await promise;
  } catch (error) {
    message.error(error.message);
  }
}

function resetPage() {
  showQrComponent.value = true;
  errorMessage.value = "";
  successMessage.value = "";
}

</script>

<style>

</style>