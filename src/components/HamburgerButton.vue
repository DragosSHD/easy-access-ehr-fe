<template>
  <div class="hamburger-button"
       :class="{ active: !props.modelValue }"
       @click="emit('update:modelValue', !props.modelValue)">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
const emit = defineEmits({
  'update:modelValue': null
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>

.hamburger-button {
  position: relative;
  cursor: pointer;
}

.hamburger-button > span {
  display: block;
  width: 33px;
  height: 4px;
  background-color: #FFFFFF;
  margin-bottom: 5px;
  position: relative;
  border-radius: 5px;
  transform-origin: 4px 0;
  transition: transform 0.2s cubic-bezier(0.77,0.2,0.05,1.0),
  background 0.2s cubic-bezier(0.77,0.2,0.05,1.0),
  opacity 0.2s ease;
}

.hamburger-button span:first-child
{
  transform-origin: 0 0;
}

.hamburger-button span:nth-last-child(2)
{
  transform-origin: 0 100%;
}

.hamburger-button.active > span {
  transform: rotate(-45deg) translate(-5px, 0);
}

.hamburger-button.active > span:nth-last-child(2)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

.hamburger-button.active > span:nth-last-child(3)
{
  transform: rotate(45deg) translate(2px, 0);
}

</style>