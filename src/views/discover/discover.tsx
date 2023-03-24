import {defineComponent, ref,Transition} from "vue";
import classes from './disvocer.module.scss'
import {getAllDiscover} from '@/http/discover'
import {stringChangeObject} from "../../utils";
import Button from "../../components/button/Button";
import Icon from "../../components/Icon/Icon";
import EditPage from "./Pages/editPage/EditPage";
import userStore from "../../store/UserStore";
import {commentDiscover} from "../../http/discover";
import FriendCard from "@/views/discover/components/FriendCard/FriendCard";

export type DiscoverMsgType ={
  author_id:string|number,
  author_name:string,
  comment:Array<any>,
  createdAt?:string,
  headImage:string,
  id:string|number,
  msgImages:Array<any>,
  msgText:string
}
export default defineComponent({

  setup(props,context){
    function getDiscover(){
      getAllDiscover().then(res=>{
        const r = res.data.data
        stringChangeObject(r)
        discoverData.value = r
        console.log(discoverData.value)
      })
    }
    getDiscover()

    const user = userStore().userInfo
    const discoverData = ref<Array<DiscoverMsgType>>([])
    const shadeImg = ref('')
    const shadeShow = ref(false)
    const inputShow = ref(false)
    const commentId = ref<string | number>(0)
    const commentDom =ref()
    const commentMsg = ref('')
    const EditShowFlag = ref(false)

    return ()=>{
      return <div class={[classes.container]} >
        {/*发送朋友圈Edit页跳转*/}
        <Icon IconName={'paizhao'} size={'1.5rem'} class={classes.sendPage} onMyClick={(e)=>{
          EditShowFlag.value = true
        }}></Icon>
        {/*<PreviewCard></PreviewCard>*/}

        {/*朋友圈头像和背景*/}
        <SelfHead headImage={user.headImage}></SelfHead>

        {/*朋友圈信息render*/}
        {discoverData.value.map(item=>{
            console.log(item)
            return <FriendCard cardInfo={item} onShowInput={({e,authorId})=>{
              commentId.value = item.id
              inputShow.value = true
              commentDom.value.value = ''
              setTimeout(()=>{commentDom.value.focus()},500)
            } }  imgUrl={item.msgImages} onShadeImgShow={(e)=>{
              console.log(e)
              shadeImg.value = e
              shadeShow.value = true
            } }></FriendCard>
          })}


        {/*朋友圈全屏显示*/}
        <Shade pic={shadeImg.value} isShow={shadeShow.value} onShadeHide={()=>{
          shadeShow.value = false
        } }></Shade>


        {/*评论框 默认hide*/}
        <div class={classes.sendInputDiv} style={{display:inputShow.value ? 'block' : 'none'}}>
          <input v-model={commentMsg.value} onKeyup={(e)=>{
            if(e.key === 'Enter') {
              inputShow.value = false
              console.log('send')
            }
          }} ref={commentDom} placeholder={'评论...'} onBlur={()=>{
            // console.log(123)
            setTimeout(()=>{inputShow.value = false})
          }} class={classes.sendInput} type="text"/>
          <Button onMyClick={async ()=>{
            const disId = commentId.value
            const sendComent = {
              msg:commentMsg.value,
              id:user.id,
              username:user.username
            }
            const result = await commentDiscover(sendComent,disId)
            console.log(result)
            commentMsg.value = ''
            getDiscover()

          } }>发送</Button>
        </div>

        {/*编辑页面*/}
        <Transition name={'fade'}>
          <div>
            <EditPage onEditFlush={()=>{
              getDiscover()
              EditShowFlag.value = false
            } } EditPageShow={EditShowFlag.value} onCancel={()=>{
              EditShowFlag.value = false
            } }></EditPage>
          </div>
        </Transition>

      </div>
    }
  }
})

const SelfHead = ({headImage}:{headImage:string})=>{
  return <div>
    <div class={classes.headerBg} style={{backgroundImage:'url("http://localhost/Bg.jpg")'}}>
      <img src={headImage} />
    </div>
  </div>
}

const Shade = defineComponent({
  emits:['ShadeHide'],
  props:{
    pic:{
      type:String
    },
    isShow:{
      type:Boolean
    }
  },
  setup(props,context){
    const {emit} = context
    return ()=>{
      return <div class={classes.shade} style={{display:props.isShow ? "flex":'none'}} onClick={(e)=>{
        emit('ShadeHide')
      } }>
        <img src={props.pic} class={classes.shadeImg}/>
      </div>
    }
  }
})
