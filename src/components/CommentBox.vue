<template>
  <form action="" class="grid">
    <textarea
      name="comment"
      id=""
      class="bg-gray-50 p-2 rounded"
      placeholder="请输入你的评论"
      v-model="content"
    >
    </textarea>
    <fieldset class="py-4">
      <input
        type="submit"
        value="评论"
        class="px-4 py-1 bg-blue-500 rounded text-white"
      />
      <input
        type="reset"
        value="取消"
        class="px-4 py-1 bg-white rounded border ml-3"
      />
    </fieldset>
  </form>
</template>

<script setup>
import ref from 'vue';
const content = ref("")
</script>

<style>
</style>