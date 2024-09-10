import AMapLoader from "@amap/amap-jsapi-loader";

const location = {
  longitude: 116.397428,
  latitude: 39.90923,
  accuracy: 100,
};

export const getMap = () => {
  let map = null;
  AMapLoader.load({
    key: "8b7a95d5ce8ebb2b39f6265e2966f621", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale", "AMap.Geolocation", "AMap.ToolBar"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 高精度开启
        radius: 10000,
        extensions: "all",
      });
      geolocation.getCurrentPosition(function (status, result) {
        if (status == "complete") {
          onComplete(result);
        } else {
          onError(result);
        }
      });
      function onComplete(data) {
        console.log("data是具体的定位信息", data);
        console.log(data.position.lng);
        console.log(data.position.lat);
        location.latitude = data.position.lat;
        location.longitude = data.position.lng;
        // onLoad(lng, lat) 从这里调用你的接口
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
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 13, // 初始化地图级别
        layers: [new AMap.TileLayer.Satellite()],
        center: [location.longitude, location.latitude], // 初始化地图中心点位置
      });
      map.addControl(geolocation);
    })
    .catch((e) => {
      console.log(e);
    });
  return map;
};
