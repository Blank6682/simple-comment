<template>
  <div>
    <button
      class="text-blue-500 my-4"
      :class="[showCommentBox ? 'pb-2' : 'pb-6']"
      @click="showCommentBox = !showCommentBox"
    >
      回复
    </button>
    <CommentBox
      class="mx-4 mb-4"
      v-if="showCommentBox"
      @submit="
        emit('submit', $event);
        showCommentBox = false;
      "
    />
  </div>
</template>

<script setup>
import CommentBox from '../components/CommentBox.vue';
import { ref } from 'vue';

let showCommentBox = ref(false)

const emit = defineEmits(["submit"]);
</script>

<style>
</style>