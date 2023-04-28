<template>
  <div ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})
const canvas = ref()
const container = ref()

onMounted(() => {
  QRCode.toCanvas(canvas.value, props.value, {
    width: container.value.offsetWidth
  }, (error) => {
    if (error) console.error(error)
  })
})

</script>

<style>
  canvas {
    width: 100%;
  }
</style>