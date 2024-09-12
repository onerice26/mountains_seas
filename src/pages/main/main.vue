<script setup>
import { initMap, initPolyline } from "../../components/maps/maps";
import { onMounted, ref } from "vue";

let path = [];
let tt = ref('');
let polyline = null;
let lastLat = 0;
let lastLng = 0;
// 更新位置函数
const updatePosition = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    if (lastLat === lat && lastLng === lng) {
        return;
    }
    lastLat = lat;
    lastLng = lng;
    tt.value = tt.value + lat + "," + lng + ";\n";
    console.log(tt.value)
    // 更新步行轨迹
    if (polyline == null) {
        path.push([lng, lat]);
        polyline = initPolyline(path);
    } else {
        path.push([lng, lat]);
        polyline.setPath(path);
    }
}
// 错误处理
const handleError = (error) => {
    console.error("位置获取失败：", error.message);
}
let nn = null | Number;

const start = () => {
    // 监控位置变化
    nn = navigator.geolocation.watchPosition(updatePosition, handleError, {
        enableHighAccuracy: true
    });
}
const end = () => {
    navigator.geolocation.clearWatch(nn)
}
onMounted(() => {
    initMap();
})
</script>
<template>
    <view id="container">
        <view class="cc">
            <!-- <up-button text="月落" @click="updatePosition(30.654344, 104.09034)"></up-button> -->
            <up-button text="开始" @click="start()"></up-button>
            <up-button text="暂停" @click="end()"></up-button>
        </view>
        <view class="dd">
            <text>位置：{{ tt }}</text>
        </view>
    </view>
</template>
<style scoped>
#container {
    position: relative;
    width: 100%;
    height: 800px;
}

.cc {
    position: absolute;
    right: 0;
    bottom: 1;
    z-index: 20;
}

.dd {
    position: absolute;
    right: 1;
    bottom: 1;
    z-index: 20;
}
</style>