<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import moment from "moment";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import { computed } from 'vue'

// 添加计算属性
const formattedExpireTime = computed(() => {
  return addTeamData.value.expireTime
      ? moment(addTeamData.value.expireTime).format('YYYY-MM-DD HH:mm')
      : '';
});

// 添加日期处理
const currentDate = ref([]);

// 初始化时设置默认值
onMounted(() => {
  if (addTeamData.value.expireTime) {
    const date = new Date(addTeamData.value.expireTime);
    currentDate.value = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ];
  }
});

// 确认时间选择
const onConfirmDate = (value) => {
  addTeamData.value.expireTime = new Date(
      value.selectedValues.join('-')
  ).toISOString();
  showPicker.value = false;
};

const router = useRouter();
const route = useRoute();
// 展示日期选择器
const showPicker = ref(false);

// 需要用户填写的表单数据
const addTeamData = ref({});

const minDate = new Date();

const id = route.query.id;

// 获取之前的队伍信息
onMounted(async () => {
  if (id <= 0) {
    showToast('加载队伍失败，请稍候重试');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = {
      ...res.data,
      // 转换字符串时间为 Date 对象
      expireTime: res.data.expireTime ? new Date(res.data.expireTime) : null
    };
  } else {
    showToast('加载队伍失败，请稍候重试')
  }
})

//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  }
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showToast('更新成功');
    router.push({
      pathname: "/team",
      replace: true,
    });
  } else {
    showToast("更新失败");
  }
};


</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="formattedExpireTime || '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              v-model="currentDate"
              type="datetime"
              :min-date="minDate"
              @confirm="onConfirmDate"
              title="请选择过期时间"
          />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="队伍密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请输入队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>