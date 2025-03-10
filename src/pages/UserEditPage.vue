<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey as string, // 断言为 string
  currentValue: route.query.currentValue as string, // 断言为 string
  editName: route.query.editName as string, // 断言为 string
})


const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showToast('用户未登录');
    return;
  }
  const res = await myAxios.post('user/update', {
    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue,
  })
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功');
    router.back();
  }else {
    showToast("修改失败");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>