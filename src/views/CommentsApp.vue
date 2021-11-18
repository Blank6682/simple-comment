<template>
  <div>
    <main class="min-h-screen p4 bg-gray-50">
      <div class="max-w-screen-xl p-8 mx-auto bg-white rounded-lg shadow-2xl">
        <h2 class="my-6 text-3xl">评论</h2>
        <!--评论form-->
        <CommentBox @submit="addNewComment" />
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
            <ReplyBox @submit="addNewReply($event, item.id)" />
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

const comments = ref([
  // {
  //   id: 1,
  //   user: "梦落轻寻",
  //   avatar: "../src/assets/image/OIP-1.jpg",
  //   time: "2小时之前",
  //   content:
  //     "哇！这篇文章真是写的太好啦！收到很大的启发，希望博主能够再接再厉，产出越来越多，越来越好的文章！凑字数，字数，字数...",
  //   replies: [
  //     {
  //       id: 2,
  //       user: "陌上花开",
  //       avatar: "../src/assets/image/OIP-2.jpg",
  //       time: "2小时之前",
  //       content: "赞！",
  //     },
  //     {
  //       id: 3,
  //       user: "半梦半醒半浮生√",
  //       avatar: "../src/assets/image/OIP-3.jpg",
  //       time: "2小时之前",
  //       content:
  //         "这是一篇非常长的长篇大论，这篇文章写的非常好，无论是技术点还是理论点，都非常的好。而且主题分明，每一个点都有自己的解释，这篇文章的主题是：CSS3的新特性，如何使用CSS3的新特性，以及如何使用CSS3的新特性。真的是非常好的文章。",
  //     },
  //   ],
  // },
]);
let rid = ref(4);

async function getAllCommments() {
  const res = await axios.get("/comments");
  comments.value = res;
}
onMounted(() => {
  getAllCommments();
});

const constructNewComment = (content) => {
  return {
    id: rid.value++,
    user: "BlankZro",
    avatar: "../src/assets/image/R-C.jpg",
    time: "1秒前",
    content,
  };
};
const handleShowCommentBox = (value) => {
  showCommentBox.value = value;
};

const addNewComment = (content) => {
  const newComment = constructNewComment(content);
  comments.value.push(newComment);
};

const addNewReply = (content, id) => {
  console.log(content);
  const reply = constructNewComment(content);
  let currComment = comments.value.find((item) => item.id == id);
  if (currComment.replies) {
    currComment.replies.push(reply);
  } else {
    currComment.replies = [reply];
  }
};
</script>

<style>
</style>