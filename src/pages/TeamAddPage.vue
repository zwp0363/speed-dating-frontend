<script setup lang="ts">
import {useRouter} from "vue-router";
import { ref, computed } from "vue";
import moment from "moment";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";

const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);

const initFormData = {
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 0,
};

// 需要用户填写的表单数据
// {...initFormData}: 这是对象展开运算符，浅拷贝，确保 addTeamData 管理的是一个独立的数据对象，修改 addTeamData.value 不会影响到原始的 initFormData
const addTeamData = ref({...initFormData});

const minDate = new Date();

// 用于日期选择器的中间变量（数组格式）
const currentDate = ref([]);

// 格式化显示的日期
const formattedExpireTime = computed(() => {
  return addTeamData.value.expireTime
      ? moment(addTeamData.value.expireTime).format('YYYY-MM-DD HH:mm')
      : '点击选择过期时间';
});

// 处理日期选择确认
const onConfirmDate = (values) => {
  // 将数组转换为 Date 对象
  const selectedDate = new Date(
      values.selectedValues[0],  // 年
      values.selectedValues[1] - 1,  // 月（JS 月份从0开始）
      values.selectedValues[2],  // 日
      values.selectedValues[3] || 0,  // 时
      values.selectedValues[4] || 0  // 分
  );

  addTeamData.value.expireTime = selectedDate.toISOString();
  showPicker.value = false;
};

//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    // 使用 ISO 格式的时间字符串
    expireTime: moment(addTeamData.value.expireTime).toISOString()
  }

  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showToast('添加成功');
    router.push({
      pathname: "/team",
      replace: true,
    });
  } else {
    showToast("添加失败");
  }
};


// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
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
            :placeholder="formattedExpireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              v-model="currentDate"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
              @confirm="onConfirmDate"
          />
        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
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