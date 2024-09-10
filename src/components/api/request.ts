export default {
  config: {
    baseURL: "https://www.holardata.com/ergj",
    getToken() {
      let token = uni.getStorageSync("userToken");
      if (!token) {
        return uni.switchTab({
          url: "/pages/login/login",
        });
      }
      return token;
    },
    // 请求拦截器
    beforeRequest(options: {} | any) {
      return new Promise((resolve, reject) => {
        options.url = this.baseURL + options.url;
        options.method = options.method || "GET";
        options.header = {
          Authorization: "Bearer " + this.getToken(),
        };
        resolve(options);
      });
    },
    // 响应拦截器
    handleResponse(data: object | any) {
      return new Promise((resolve, reject) => {
        const [err, res] = data;
        if (res && res.statusCode !== 200) {
          let msg = res.data.msg || "请求错误";
          uni.showToast({
            icon: "none",
            title: msg,
          });
          return reject(msg);
        }
        if (err) {
          uni.showToast({
            icon: "none",
            title: "请求错误",
          });
          return reject(err);
        }
        return resolve(res.data);
      });
    },
  },
  request(options: {} | any) {
    return this.config
      .beforeRequest(options)
      .then((opt) => {
        return uni.request(opt);
      })
      .then((res) => this.config.handleResponse(res));
  },
};
