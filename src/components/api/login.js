import api from './request'
// 水印图片
function getPhotoImg(data) {
    return api.request({
        method: 'post',
        url: '/jcxywzx/add',
        data: data
    })
}
// 验证码
function getCode(data) {
    return api.request({
        method: 'get',
        url: '/api/v1/login/checkCode',
        responseType: 'arraybuffer',
        data: data
    })
}
// 登录
function getLogin(data) {
    return api.request({
        method: 'post',
        url: '/api/v1/login/auth2',
        data: data
    })
}
// 告警列表
function getAlarm(data) {
    return api.request({
        method: 'get',
        url: '/alarm/page',
        data: data
    })
}

export {
    getPhotoImg,
    getCode,
    getLogin,
    getAlarm
}