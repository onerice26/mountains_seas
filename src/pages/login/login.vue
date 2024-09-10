<template>
    <view class="page-login">
        <!-- <up-text class="title" text="登录"></up-text> -->
        <up-form labelPosition="left" :model="formData" :rules="rules" ref="formRef">
            <up-form-item label="姓名" prop="account" borderBottom ref="item1">
                <up-input v-model="formData.account" border="bottom" placeholder="请输入账号" clearable></up-input>
            </up-form-item>
            <up-form-item label="密码" prop="password" borderBottom ref="item1">
                <up-input v-model="formData.password" type="password" border="bottom" placeholder="请输入密码" clearable></up-input>
            </up-form-item>
            <up-button type="primary" @click="submit">登录</up-button>
        </up-form>
    </view>
</template>
<script setup>
import { ref, reactive } from 'vue';
const formData = reactive({
    account: '',
    password: ''
})
const rules = {
    account: [
        {
            type: 'string',
            required: true,
            message: '请输入账号'
        }
    ],
    password: [
        {
            type: 'string',
            required: true,
            message: '请输入密码'
        }
    ]
}

const formRef = ref()

const submit = () => {
    if (formRef.value) {
        formRef.value
            .validate()
            .then((valid) => {
                console.log('valid', valid)
                uni.showToast({
                    title: '登录成功',
                    icon: 'none',
                    success: () => {
                        uni.redirectTo({
                            url: '/pages/index/index'
                        })
                    }
                })
            })
            .catch((err) => {
                // 处理验证错误
                console.log(err)
            })
    }
}
</script>
<style lang="scss">
.page-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
}
</style>