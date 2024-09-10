<template>
  <view class="u-demo-block__content">
    <up-row customStyle="margin-bottom: 10px;margin-top: 10px">
      <up-col span="12">
        <up-search :show-action="true" actionText="搜索" :placeholder="请输入关键字"></up-search>
      </up-col>
    </up-row>
    <up-row customStyle="margin-bottom: 10px;margin-top: 10px">
      <up-col span="12">
        <up-grid :border="false" @click="click">
          <up-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
            <!-- <up-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="22"></up-icon> -->
            <up-image :src="`${src}${baseListIndex + 1}.jpg`" shape="circle" width="80px" height="80px"></up-image>
            <text class="grid-text">{{ baseListItem.title }}</text>
          </up-grid-item>
        </up-grid>
      </up-col>
    </up-row>
    <up-row justify="space-between" customStyle="margin-bottom: 10px;margin-top: 10px">
      <up-col span="12">
        <view class="album__content" v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
          <up-image :src="`${src}${baseListIndex + 1}.jpg`" width="150px" height="150px"></up-image>
          <up-text :text="baseListItem.title" type="primary" bold size="17"></up-text>
          <up-text margin="0 0 8px 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"></up-text>
        </view>
      </up-col>
    </up-row>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const src = ref('https://cdn.uviewui.com/uview/album/');
// 创建响应式数据  
const baseList = ref([
  {
    name: 'photo',
    title: '图片'
  },
  {
    name: 'lock',
    title: '锁头'
  }, {
    name: 'photo',
    title: '图片'
  },
  {
    name: 'lock',
    title: '锁头'
  },
  {
    name: 'star',
    title: '星星'
  },
  {
    name: 'star',
    title: '星星'
  }, {
    name: 'photo',
    title: '图片'
  },
  {
    name: 'lock',
    title: '锁头'
  },
  {
    name: 'star',
    title: '星星'
  },
]);  
</script>
<style lang="scss">
.u-demo-block__content {
  background: #e5e9f2;
}

.wrap {
  padding: 12px;
}

.demo-layout {
  height: 25px;
  border-radius: 4px;
}

.bg-purple {
  background: #CED7E1;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>