<template>
  <div>
    <main class="min-h-screen p4 bg-gray-50">
      <div class="max-w-screen-xl p-8 mx-auto bg-white rounded-lg shadow-2xl">
        <h2 class="my-6 text-3xl">评论</h2>
        <!--评论form-->
        <CommentBox @submit="addNewComment($event)" />
        <!--分隔线-->
        <DividerHorizontal />
        <!--单个留言-->
        <div v-for="item in comments" :key="item.id">
          <CommentItem
            :user="item.user"
            :avatar="item.avatar"
            :content="item.content"
            :time="item.time"
          >
            <!--回复列表-->
            <ReplyContainer>
              <div v-for="reply in item.replies" :key="reply.id">
                <CommentItem
                  :user="reply.user"
                  :avatar="reply.avatar"
                  :content="reply.content"
                  :time="reply.time"
                />
              </div>
            </ReplyContainer>
            <!--回复按钮-->
            <ReplyBox @submit="addNewComment($event, item.id)" />
          </CommentItem>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import CommentBox from "../components/CommentBox.vue";
import CommentItem from "../components/CommentItem.vue";
import DividerHorizontal from "../components/DividerHorizontal.vue";
import ReplyBox from "../components/ReplyBox.vue";
import ReplyContainer from "../components/ReplyContainer.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const comments = ref([]);

async function getAllCommments() {
  const res = await axios.get("/api/comments");
  comments.value = res.data;
}
onMounted(() => {
  getAllCommments();
});

const handleShowCommentBox = (value) => {
  showCommentBox.value = value;
};

//评论/回复（replyTo有值）
const addNewComment = async (content, replyTo) => {
  if (!content) return;
  const res = await axios.post("/api/comments", {
    content,
    ...(replyTo && { replyTo }), //使用解构replyTo有值则传参，无则不传
  });
  const newComment = res.data;
  if (!replyTo) {
    comments.value.unshift(newComment);
  } else {
    comments.value
      .find((item) => item.id == replyTo)
      .replies.unshift(newComment);
  }
  //notionAPI 有延迟，所有接口返回数据在原有数据上进行操作，减少接口请求次数
  // setTimeout(() => {
  //   getAllCommments();
  // }, 1000);
};
</script>

<style>
</style>