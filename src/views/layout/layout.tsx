import {defineComponent, watch} from "vue";
import Tabbar, {TabItem} from "../../components/tabbar/tabbar";
import {RouterView, useRouter} from "vue-router";
import classes from './layout.module.scss'
import useUserInfo from '@/store/UserStore'
import MessageStore from "../../store/MessageStore";
import {changeArr} from "../chatPage";
import TokenStore from "@/store/tokenStore";
import {clearToken} from "@/utils/token";
export default defineComponent({
  setup(props,context){
    const MsgStore = MessageStore()
    const token = TokenStore()
    const Router = useRouter()
    const userInfo = useUserInfo() // 个人信息
    const id = userInfo.userInfo.id
    // tokenClear
    watch(token,(newValue,oldValue)=>{
      if(!newValue.token){
        clearToken()
        Router.push('/login')
      }
    },)
    const evtSource = new EventSource(`http://localhost:7777/stream/${id}`); // 开启SSE
    evtSource.onmessage = function (e) {
      console.log('服务端推送')
      const DBArr = JSON.parse(e.data) as Array<any>
      MsgStore.MsgSSE = [...DBArr]
      const data = changeArr(MsgStore.MsgSSE)
      const currentArr = data.find((item)=>{
        return  item.toId == MsgStore.currentToId
      })
      currentArr && (MsgStore.currentMsgArr = currentArr.data)
    }
    return ()=>{
      return <div class={classes.layout}>
        <RouterView></RouterView>
        <Tabbar>
          <TabItem title={'消息'} Icon={'xiaoxi'} path={'/layout/message'}></TabItem>
          <TabItem title={'通讯录'} Icon={'tongxunlu'} path={'/layout/address'}></TabItem>
          <TabItem title={'发现'} Icon={'faxian'} path={'/layout/discover'}></TabItem>
          <TabItem title={'个人'} Icon={'me'} path={'/layout/profile'}></TabItem>
        </Tabbar>
      </div>
    }
  }
})