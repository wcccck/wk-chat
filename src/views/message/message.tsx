import {defineComponent, nextTick, ref} from "vue";
import MailCard from "@/components/mailCard/mailCard";
import classes from './index.module.scss'
import BScroll from 'better-scroll'
import {getReceiveMessage} from '../../http/Message'
import {getFriend} from '../../http/address'
import MessageStore from "../../store/MessageStore";
import useUserInfo from '@/store/UserStore'
import {changeArr} from "../chatPage";
import {useRouter} from "vue-router";

export type MsgDataType = {
  toId:string | number
  data:Array<any>
}


export default defineComponent({
  setup(props,context){
    const userInfo = useUserInfo() // 个人信息
    const Router = useRouter()
    const id = userInfo.userInfo.id
    const friend = userInfo.userFriend
    if(!friend ||friend.length<=0){
      getFriend(id).then(res=>{
        userInfo.userFriend = res.data.data
      })
    }
    const MsgStore = MessageStore()
    if( MsgStore.MsgSSE.length <= 0){
      getReceiveMessage(id).then(res=>{
        MsgStore.MsgSSE = res.data.data // 持久化
      })
    }
    let main = ref()
    nextTick(()=>{
      new BScroll(main.value,{
        click:true
      })
    })

    return ()=>{
      return <div>
        <div class={classes.header}>
          消息
        </div>
        <div class={['wrapper', classes.main]} ref={main}>
          <div class={[classes.container, 'content']}>
            {changeArr(MsgStore.MsgSSE).map((item, index,array) => {
              let i = 0 // 红点
              const data = item.data // 传入数据
              const friend =userInfo.userFriend && userInfo.userFriend.find((el)=>{
                return el.friend_id == item.toId
              });
              // double r

              const lastMsg = data[data.length-1].msg
              data.forEach((item)=>{
                console.log(item)
                if(item.status == 3) i ++
              })
              return <MailCard unReadNum={i} lastMsg={lastMsg} cardInfo={friend}  onMyClick={() => {
                MsgStore.currentMsgArr = data
                MsgStore.currentToId = item.toId;
                Router.push('/layout/chat')
              }}>
                <button>删除</button>
              </MailCard>
            })}
          </div>
        </div>
      </div>
    }
  }
})

