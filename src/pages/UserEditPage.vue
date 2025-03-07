<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey as string, // 断言为 string
  currentValue: route.query.currentValue as string, // 断言为 string
  editName: route.query.editName as string, // 断言为 string
})

const onSubmit = (values: { currentValue: string} ) => {
  // todo 把editKey, currentValue, editName 提交到后台
  console.log('onSubmit', values);
}
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