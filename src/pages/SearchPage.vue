<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router"; // 从 Vue 库中导入 `ref` 函数，用于创建响应式数据

const router = useRouter();
/**
 * 搜索过滤
 * @type
 */
const searchText = ref('');
// 响应式行为： 当用户在搜索框中输入文字时，searchText.value 的值会自动更新，因为 v-model 实现了双向数据绑定。
// 反过来，如果你在代码中修改了 searchText.value 的值，搜索框中的内容也会自动更新
const onSearch = (val) => {
  tagList.value = originTagList // // 将 `tagList.value` 更新为 `originTagList` 的新数组
      .map(parentTag => { // 使用 `map` 方法遍历 `originTagList` 数组中的每个父标签对象
        const tempChildren = [...parentTag.children]; // 创建一个父标签对象 `parentTag` 的 `children` 数组的浅拷贝 `tempChildren`，避免直接修改原始数据
        const tempParentTag = {...parentTag}; // 创建一个父标签对象 `parentTag` 的浅拷贝 `tempParentTag`，避免直接修改原始数据
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        // 使用 `filter` 方法过滤 `tempChildren` 数组，只保留 `item.text` 包含 `searchText.value` (搜索框中的文本) 的子标签，并将过滤后的结果赋值给 `tempParentTag.children
        return tempParentTag;
      })
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
}

// 已选中的标签
const activeIds = ref([]);
// 响应式行为：当用户在 <van-tree-select> 组件中选择标签时，activeIds.value 数组会自动添加选中的标签 ID。
// 当用户点击已选标签的关闭按钮，doClose 函数会修改 activeIds.value 数组，移除对应的标签 ID
const activeIndex = ref(0);
// 响应式行为： 当你修改 activeIndex.value 的值时，<van-tree-select> 组件会自动切换到对应索引的主类目

// 标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '研一', id: '研一'},
      {text: '研二', id: '研二'},
      {text: '研三', id: '研三'},
    ],
  },
];

let tagList = ref(originTagList);
// 响应式行为： 当 onSearch 函数根据搜索文本过滤标签后，会更新 tagList.value 的值。
// Vue.js 会检测到 tagList.value 的变化，并自动重新渲染 <van-tree-select> 组件，从而在 UI 上显示过滤后的标签列表。
// 同样，当 onCancel 函数将 tagList.value 重置为 originTagList 时，UI 也会自动恢复显示全部标签

//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => { // 使用 `filter` 方法过滤 `activeIds.value` 数组
    return item !== tag; // 只保留数组中元素不等于要移除的 `tag` 的元素，即移除指定的标签 ID
  });
}

const doSearchResult = () => {
  router.push({
    path: 'user/list',
    query: {
      tags: activeIds.value,
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<style scoped>

</style>