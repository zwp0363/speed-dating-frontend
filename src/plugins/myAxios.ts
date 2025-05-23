import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

// 使用自定义配置新建一个实例,即每次请求的共同前缀
const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api/' : 'https://yupao-backend-143596-5-1345130790.sh.run.tcloudbase.com',
});

myAxios.defaults.withCredentials = true; // 向后端发送请求时带上请求的凭证即cookie

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;