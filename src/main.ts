import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Button, Icon, showToast, NavBar, Tabbar, TabbarItem } from "vant";

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.mount("#app");
