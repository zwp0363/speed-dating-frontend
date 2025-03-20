<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.js";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

// 根据路由切换标题
router.beforeEach((to, from) => {
  const tpPath = to.path;
  const route = routes.find((route) => {
    return tpPath == route.path;
  })
  if (!route?.title) {
    title.value = DEFAULT_TITLE;
  } else {
    title.value = route.title;
  }
})

const onClickLeft = () => {
  router.back(); // 返回上个界面
}
const onClickRight = () => {
  router.push('/search'); //搜索界面
}

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>