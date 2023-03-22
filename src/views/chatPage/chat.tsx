import {defineComponent, inject, nextTick, PropType, provide, ref, watch, onUnmounted, watchEffect, Ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import classes from './chat.module.scss'
import Icon from "../../components/Icon/Icon";
import Button from "../../components/button/Button";
import {MsgType} from "../../http/Message";
import userStore from "../../store/UserStore";
import MessageStore from "../../store/MessageStore";
export default defineComponent({
  props:{
    chatArr:{
      type: Object
    },

  },
  setup(props,context){
    const showChat = inject('chatShow') as Ref<boolean>
    const msgStore = MessageStore()
    const UserStore = userStore()
    const user = UserStore.userInfo
    const friend = UserStore.userFriend
    const myId = user.id
    const sendId = msgStore.currentToId
    const nowFriend = friend.find(item=>{
      return item.friend_id == msgStore.currentToId
    })
    type nowFriendType = {
      createdAt?:string,
      friend_id:string | number,
      friend_image:string,
      friend_name:string,
      id:string |number,
      user_id:string|number
    }
    console.log(nowFriend)
    const evtSource = new EventSource(`http://localhost:7777/chatSession/${sendId}`);
    // 初始化Message数据
    const sendMsg = ref<MsgType>(
        {
          from:myId,
          to:sendId,
          msg:"",
          type:"0",
          status:"1"
        }
    )

    onUnmounted(()=>{
      evtSource.close()
    })
    provide('sendMsg',sendMsg)
    const container = ref()
    nextTick(()=>{
      const item = container.value
      item.scrollTop = item.scrollHeight
    })
    watchEffect(()=>{
      if(msgStore.currentMsgArr) {
        if (container.value) {
          setTimeout(()=>{ // 更新完成dom未必渲染完成 所以需要延迟一下
            container.value.scrollTop = container.value.scrollHeight
          },300)
        }
      }
    })
    return ()=>{
      return <div class={classes.container}  style={{display:showChat?.value == true ? 'block':"none"}}>
        <header>
          <Icon IconName={'zuojiantou'} size={'1.7rem'} onMyClick={()=>{
            showChat.value = false
            // msgStore.MsgCurrent = []
          }}></Icon>
          <span style={{fontSize:"1.3rem"}}>{(nowFriend as nowFriendType).friend_name}</span>
          <Icon IconName={'more'} size={'1.7rem'} onMyClick={()=>{console.log(4576)}}></Icon>
          <div class={classes.bottom}></div>
        </header>
        <main ref={container}>
          {msgStore.currentMsgArr.map((item,index)=>{
            return <Chat userImage={myId !== item.from  ?(nowFriend as nowFriendType).friend_image : ''} obj={item} Message={myId == item.from? 'right':'left'}></Chat>
          })}
        </main>
        <Footer container={container}></Footer>
      </div>
    }
  }
})

type MessageType = 'left' | 'right'
const Chat = defineComponent({
  props:{
    obj:{
      type:Object
    },
    userImage:{
      type:String
    },
    Info:{
      type:String
    },
    Message:{
      type:String as PropType<MessageType>,
      // required:true,
      default:"left"
    }
  },
  setup(props,context){

    const obj = props.obj
    const Message = props.Message
    const {slots} = context
    const alertDom = ref()
    nextTick(()=>{
      if(Message == 'left'){
        alertDom.value.style.setProperty('--testColor','#ffffff')
        alertDom.value.style.setProperty('--textColor','black')
      }else{
        alertDom.value.style.setProperty('--textColor','#ffffff')
      }
    })

    let imgUrl = ref('')
     import('./head.jpg').then(res=>{
      imgUrl.value = res.default as string
    })
    return ()=>{
      // @ts-ignore
      return <div class={[classes.Chat]} style={{flexDirection:props.Message == 'right' ? "row-reverse" : ""}}>
          <img src={props.userImage?props.userImage : imgUrl.value} class={classes.headImag}/>
          <div ref={alertDom} class={[classes.Alert,props.Message == 'left' ? classes.leftAlert : classes.rightAlert]}>
            <span>{obj?.msg}</span>
            <div class={[classes.triangle,props.Message == 'left' ? classes.triangleLeft : classes.triangleRight]}></div>
          </div>
      </div>
    }
  }
})
import {sendMessage} from "../../http/Message";
const Footer = defineComponent({
  props:{
    container:{
      type:Object
    }
  },
  setup(props,context){

    const sendMsg =  inject('sendMsg') as Ref<MsgType>
    const inputVal = ref('')
    return ()=>{
      return <div class={classes.footer}>
        <Icon IconName={'yuyin'} size={'65px'} onMyClick={()=>{console.log(12)} }></Icon>
        <input type="text" v-model={inputVal.value}/>
        <div class={classes.line}></div>
        <Button onMyClick={()=>{
            if(inputVal.value.trim() == '') {
              alert('不能发送空消息')
              return
            }
            sendMsg.value.msg = inputVal.value
            sendMessage(sendMsg.value).then(res=>{
              inputVal.value = ''
            })
        }} >发送</Button>
      </div>
    }
  }
})