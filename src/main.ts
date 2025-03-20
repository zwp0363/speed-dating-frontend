import { createApp } from "vue";
import * as VueRouter from "vue-router";
import routes from "./config/route.ts";
import App from "./App.vue";
import Vant from "vant";
import 'vant/lib/index.css';
import './global.css'

const app = createApp(App);
app.use(Vant);

//创建路由实例并传递routes配置
const router = VueRouter.createRouter({
    // 内部提供了history模式的实现，简单起见，这里使用hash模式，即在网址后加#表示不同页面
    //history: VueRouter.createWebHashHistory(),
    // 内存历史模式：路由的改变只发生在内存中，不会反映到浏览器的 URL上
    //history: VueRouter.createMemoryHistory(),
    // 使用浏览器的 History API（如 pushState 和 replaceState）来管理历史记录。 URL 看起来更干净（没有 #）
    history: VueRouter.createWebHistory(),
    routes,
})

app.use(router)
app.mount("#app");




