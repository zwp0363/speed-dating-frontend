<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

/*const user = {
  id: 1,
  username: 'zwp',
  userAccount: 'zhouwupeng',
  avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
  gender: '男',
  phone: '123456789',
  email: '12345@gmail.com',
  planetCode: '1234',
  createTime: new Date(),
}*/

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>

<style scoped>

</style>