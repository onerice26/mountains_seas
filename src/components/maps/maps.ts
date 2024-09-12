import AMapLoader from "@amap/amap-jsapi-loader";
import { transformFromGCJToWGS } from "./gcj02towgs84"


const location = {
  longitude: 116.397428,
  latitude: 39.90923,
  accuracy: 100,
};
export const initMap = () => {
  // window._AMapSecurityConfig = {
  //   securityJsCode: "ddb0bc10833cebc6a5700ece91404d7f",
  // };
  AMapLoader.load({
    key: "8b7a95d5ce8ebb2b39f6265e2966f621", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Geolocation", "AMap.Polyline"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      window.AMap = AMap;
      // 将 AMap 挂载到 window 对象上
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 高精度开启
        timeout: 10000, //超过10秒后停止定位，默认：5s
        position: "RB", //定位按钮的停靠位置
        offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
      });
      geolocation.getCurrentPosition(function (status, result) {
        if (status == "complete") {
          onComplete(result);
        } else {
          onError(result);
        }
      });
      window.myGeolocation = geolocation;
      const map = new AMap.Map("container", {
        resizeEnable: true,
      });
      window.myMap = map;
      map.addControl(geolocation);
      function onComplete(data) {
        console.log("data", data)
        const position = transformFromGCJToWGS(data.position.lat, data.position.lng);
        location.latitude = position.latitude;
        location.longitude = position.longitude;
        location.accuracy = data.accuracy;
        console.log("location", location)
        map.setZoomAndCenter(15, [location.longitude, location.latitude]);
      }
      function onError(error) {
        // 定位出错
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const initPolyline = (path) => {
  //创建 Polyline 实例
  var polyline = new window.AMap.Polyline({
    path: path,
    isOutline: true,
    outlineColor: "#ffeeff",
    borderWeight: 3,
    strokeColor: "#3366FF",
    strokeOpacity: 1,
    strokeWeight: 6,
    // 折线样式还支持 'dashed'
    strokeStyle: "solid",
    // strokeStyle是dashed时有效
    strokeDasharray: [10, 5],
    lineJoin: "round",
    lineCap: "round",
    zIndex: 50,
  });
  window.myMap.add(polyline);
  return polyline;
};