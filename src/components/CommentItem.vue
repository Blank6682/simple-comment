<template>
  <div>
    <div class="flex justify-between">
      <div class="flex">
        <img class="w-16 h-16 rounded-full" :src="avatar" />
        <div class="my-auto ml-4">
          <p class="font-bold">{{ user }}</p>
          <p class="text-sm text-gray-700">{{ time }}</p>
        </div>
      </div>
      <div class="my-auto">...</div>
    </div>
    <p class="my-4 text-sm text-gray-700">
      {{ content }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  user: String,
  avatar: String,
  time: String,
  content: String,
});
</script>

<style>
</style>