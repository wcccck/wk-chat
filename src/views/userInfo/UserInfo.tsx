import {defineComponent, inject, provide, Ref, ref} from "vue";
import classes from './UserInfo.module.scss'
import Cell from "@/components/cell/Cell";
import Icon from "@/components/Icon/Icon";
import EditContact from "./Pages/EditContact/EditContact";
import {useRoute, useRouter,Router} from "vue-router";
import {FriendInfo} from "@/store/UserStore";
import {getSessionData, setSessionData} from "@/utils";
import {changeArr} from "@/views/chatPage";
import MessageStore from "@/store/MessageStore";


export default defineComponent({
  setup(props,context){
    const params = useRoute().params as FriendInfo
    const renderData = ref<FriendInfo>()
    const Router = useRouter()
    provide('router',Router)
    if(Object.keys(params).length > 0){
      renderData.value = {...params}
      setSessionData(params,'userInfo')
    }else{
      let data = JSON.parse(getSessionData('userInfo'))
      renderData.value = data
    }
    const EditContactShowFlag = ref(false)
    return ()=>{
      return <div class={classes.container}>
        <Header></Header>
        {/*@ts-ignore*/}
        <UserCard renderData={renderData}></UserCard>
        <Cell bottomBorder={true} onWkClick={()=>{
          console.log('进入朋友圈')
        } } title={'more'}>{{
          left:()=> <span>Moments</span>
        }}</Cell>
        <Cell title={'Edit Contact'} bottomBorder={true} onWkClick={()=>{
          EditContactShowFlag.value = true
        } }>
          {{
            left:()=> <span>Edit Contact</span>
          }}
        </Cell>
        <Cell title={'Edit Contact'} bottomBorder={true} onWkClick={()=>{
          console.log('More ')
        } }>
          {{
            left:()=> <span>More</span>
          }}
        </Cell>
        <MsgChat onMyClick={()=>{
          const MsgStore = MessageStore()
          const curentMsg = changeArr(MsgStore.MsgSSE)
          const nowFriend = curentMsg.find(item=>{
            return item.toId == renderData.value?.friend_id
          })
          if(nowFriend){
            MsgStore.currentMsgArr = nowFriend.data
            MsgStore.currentToId = nowFriend.toId
          }else{
            MsgStore.currentMsgArr = []
            MsgStore.currentToId = renderData.value!.friend_id
          }
          // console.log(MsgStore.currentMsgArr)
          // console.log(MsgStore.currentToId)
          Router.push('/layout/chat')
        } }></MsgChat>
        {EditContactShowFlag.value ? <EditContact onCancel={()=>{
          EditContactShowFlag.value = false
        } }></EditContact> : ''}

      </div>
    }
  }
})

const Header = defineComponent({
  setup(props,context){
    const Router = inject('router') as Router
    return ()=>{
      return <header class={classes.header}>
        <Icon IconName={'zuojiantou'} onMyClick={()=>{
          Router.back()
        }} size={'1.2rem'}></Icon>
        <Icon IconName={'more'} size={'1.2rem'}></Icon>
      </header>
    }
  }
})

const UserCard = ({renderData}:{renderData:Ref<FriendInfo>})=>{
  return <div class={classes.Info}>
    <div class={classes.InfoLeft}>
      <img src={renderData.value.friend_image} />
    </div>
    <div class={classes.InfoRight}>
      <div>{renderData.value.alias || renderData.value.friend_name}</div>
      <div>{renderData.value.friend_chatId}</div>
    </div>
  </div>
}


const MsgChat = defineComponent({
  emits:['myClick'],
  setup(props,context){
    return ()=>{
      return <div class={classes.sendCell} onTouchend={()=>{
        context.emit('myClick')
      } }>
        <div class={classes.sendCellBox}>
          <Icon IconName={'xinxi'} size={'1.4rem'}></Icon>
          <span>Messages</span>
        </div>
        <div class={classes.sendCellBoxBottom}></div>
      </div>
    }
  }
})