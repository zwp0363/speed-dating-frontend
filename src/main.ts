import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Button, Icon, Toast, NavBar, Tabbar, TabbarItem} from 'vant'

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Toast);
app.use(Tabbar);
app.use(TabbarItem);
app.mount('#app')