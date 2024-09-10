import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const location = {
  longitude: 116.397428,
  latitude: 39.90923,
  accuracy: 100,
};

// 获取位置
function getLocation(AMap:any) {
    let geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否获取高精度定位，可能影响效率，默认false
      timeout: 10000, // 定位超时时间，ms
      needAddress: true, // 是否需要将定位结果进行逆地理编码操作
      extensions: 'all', // 是否需要详细的你地理编码信息，默认'base'
    })
    // 获取精确位置
    geolocation.getCurrentPosition(function(status, result) {
      console.log(status);
      console.log(result);
    })
    // 获取城市信息
    geolocation.getCityInfo(function(status, result) {
      console.log(status);
      console.log(result);
    })
  }

//点标记显示内容
const markerContent = `<div class="custom-content-marker">
<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
<div class="close-btn" onclick="clearMarker()">X</div>
</div>`;
// const clearMarker = () => {
//   map.remove(marker); //清除 marker
// };
let map = null;

const getMap = () => {
  AMapLoader.load({
    key: "8b7a95d5ce8ebb2b39f6265e2966f621", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale", "AMap.Geolocation", "AMap.ToolBar"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    Loca: {
      version: "2.0",
    },
  })
    .then((AMap) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 高精度开启
        radius: 10000,
        extensions: "all",
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);
      function onComplete(data: any) {
        console.log("data是具体的定位信息", data);
        console.log(data.position.lng);
        console.log(data.position.lat);
        // onLoad(lng, lat) 从这里调用你的接口
      }
      function onError(err: unknown) {
        // 定位出错
        console.log("定位失败", err);
      }
    })
    .catch((e: unknown) => {
      console.log(e);
    });
};

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  } else {
    console.log("浏览器不支持定位！");
  }
  getMap();
});

onUnmounted(() => {
  map?.destroy();
});
