import { createApp } from 'vue'
import {createPinia} from "pinia"; // store配置
import {createPersistedState} from "pinia-plugin-persistedstate"; // 持久化处理
import 'virtual:svg-icons-register' // svg 配置
import './style.css'
import App from './App'
import Router from "./router";
import {MessageBox} from '@/components/MessageBox/MessageBox'

// import 'default-passive-events' // 默认行为
// import {stopDoubleClick} from "@/utils";


createApp(App).use(createPinia().use(createPersistedState({
  serializer:{
    serialize:JSON.stringify,
    deserialize:JSON.parse
  }
}))).use(Router).mount('#app')
// MessageBox('hahah')


