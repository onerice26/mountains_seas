<template>
    <view class="profile-container">
        <up-card title="个人信息" :border="false" class="profile-card">
            <template #body>
            <view class="profile-item">
                <up-icon name="user" size="40" color="#007AFF" />
                <view class="profile-info">xxx
                    <up-text class="profile-name" :text="user.name"></up-text>
                    <up-text class="profile-email">{{ user.email }}</up-text>
                </view>
            </view>
            </template>
        </up-card>
        <up-text class="profile-name" :text="user.name"></up-text>
        <up-text class="profile-email" :text="user.email"></up-text>

        <up-button type="primary" class="edit-button" @click="editProfile">编辑个人资料</up-button>
        <up-button type="default" class="logout-button" @click="logout">退出登录</up-button>
        <view>12312123</view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
const user = reactive({
    name: '张三',
    email: 'zhangsan@example.com'
})
const editProfile = () => {
    // 这里添加编辑个人资料的逻辑，比如跳转到编辑页面
    console.log('编辑个人资料');
}
const logout = () => {
    // 这里添加退出登录的逻辑
    console.log('退出登录');
}
</script>

<style lang="scss">
.profile-container {
    padding: 20px;
}

.profile-card {
    margin-bottom: 20px;
}

.profile-item {
    display: flex;
    align-items: center;
}

.profile-info {
    margin-left: 10px;
}

.profile-name {
    font-size: 18px;
    font-weight: bold;
}

.profile-email {
    font-size: 14px;
    color: #888;
}

.edit-button,
.logout-button {
    margin-top: 10px;
    width: 100%;
}
</style>