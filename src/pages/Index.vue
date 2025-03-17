<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);

// 使用了 Vue.js 的 onMounted 生命周期钩子函数，在组件挂载完成后执行一个异步操作
// 即组件渲染完毕并插入到页面中后，向后端 API /user/search/tags 发起 GET 请求
onMounted(async () => {
  // 向给定ID的用户发起请求
  const userListData = await myAxios.get('/user/recommend', { // await等待请求全部结束才等到数据
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response) {
        console.log('/user/recommend succeed', response);
        showToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.error('/user/recommend error', error);
        showToast('请求失败');
      });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<style scoped>

</style>