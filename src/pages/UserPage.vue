<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const user = {
  id: 1,
  username: 'zwp',
  userAccount: 'zhouwupeng',
  avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
  gender: '男',
  phone: '123456789',
  email: '12345@gmail.com',
  planetCode: '1234',
  createTime: new Date(),
}
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username"/>
  <van-cell title="账号" :value="user.userAccount"/>
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 48px"  :src="user.avatarUrl" />
  </van-cell>
  <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone"  @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"/>
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
</template>

<style scoped>

</style>