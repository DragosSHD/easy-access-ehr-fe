<template>
  <div>
    <qrcode-stream @decode="onDecode"
                   v-if="showQrComponent"
                   @init="onInit"/>
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader';
import { useMessage } from 'naive-ui';
import { ref } from "vue";

const message = useMessage();
const showQrComponent = ref(true)

async function onDecode (content) {
  const token = content;
  showQrComponent.value = false;
  console.log(token);
}

async function onInit (promise) {
  try {
    await promise;
  } catch (error) {
    message.error(error.message);
  }
}
</script>

<style>

</style>