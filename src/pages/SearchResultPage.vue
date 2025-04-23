<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import qs from "qs";

const route = useRoute();

const {tags} = route.query;

const userList = ref([]);

// 使用了 Vue.js 的 onMounted 生命周期钩子函数，在组件挂载完成后执行一个异步操作
// 即组件渲染完毕并插入到页面中后，向后端 API /user/search/tags 发起 GET 请求
onMounted(async () => {
  // 向给定ID的用户发起请求
  const userListData = await myAxios.get('/user/search/tags', { // await等待请求全部结束才等到数据
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false});
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
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
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username}(${user.id})}`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="">搜索结果为空</van-empty>
</template>

<style scoped>

</style>