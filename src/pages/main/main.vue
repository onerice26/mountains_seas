<script setup>
import { initMap, initPolyline } from "../../components/maps/maps";
import { onMounted } from "vue";

var path = [
    [104.087575, 30.65382],
    [104.088871, 30.653315],
    [104.089077, 30.65374],
    [104.089431, 30.654486]
];

let polyline = null;
// 更新位置函数
function updatePosition(lat, lng) {
    if (polyline == null) {
        // path.push([lng, lat]);
        polyline = initPolyline(path);
    } else {
        var path1 = polyline.getPath();
        path1.push([lng, lat]);
        polyline.setPath(path1);
    }
}
onMounted(() => {
    initMap();
})
</script>
<template>
    <view id="container">
        <view class="cc">
            <up-button text="月落" @click="updatePosition(30.654344,104.09034)"></up-button>
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
    bottom: 0;
    z-index: 15;
}
</style>