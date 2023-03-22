import {defineComponent, ref} from "vue";
import classes from './EditPage.module.scss'
import Button from "../../../../components/button/Button";
import userStore from "../../../../store/UserStore";
import {sendDiscover} from "../../../../http/discover";
export type SendMsgType = {
  author_id:string |number,
  author_name:string ,
  headImage:string,
  msgText:string,
  msgImages:string,
  createdAt?:string
}
export default defineComponent({
  props:{
    EditPageShow:{
      type:Boolean,
      required:true
    }
  },
  emits:['cancel','editFlush'],
  setup(props,context){
    const FileList = ref([])
    const SendMsg = ref<SendMsgType>({
      author_id:'',
      author_name:'',
      headImage:"http://localhost/head.jpg",
      msgText:"11",
      msgImages:'["http://localhost/mbp.webp","http://localhost/meixi.jpeg"]'
    })
    const userInfo = userStore().userInfo
    const id= userInfo.id
    const username =  userInfo.username
    SendMsg.value.author_id = id
    SendMsg.value.author_name = username
    return ()=>{
      return props.EditPageShow ? <div class={classes.container}>
        <EditHead onSendData={async ()=>{
        //   if(SendMsg.value.author_id! || SendMsg.value.msgText! || SendMsg.value.headImage! || FileList.value.length <=0){
        //     alert("send error")
        //     return
        //   }
          try{
            const result = await sendDiscover(FileList.value,SendMsg.value)
            context.emit('editFlush',result)
          }catch (e){
            console.log(e)
          }

        } } onCancel={(e)=>{
          context.emit('cancel',e)
        }}></EditHead>
        <EditInput onDataChange={(e)=>{FileList.value = e.value} }></EditInput>
      </div> : ''
    }
  }
})

const EditHead = defineComponent({
  emits:['cancel','sendData'],
  setup(props,context){
    return ()=>{
      return <header class={classes.EditHead}>
        <button class={classes.cancelBtn} onTouchend={(e)=>{
          context.emit('cancel',e)
        } }>取消</button>
        <Button onMyClick={()=>{
          context.emit('sendData')
        } }>发表</Button>
      </header>
    }
  }
})

const EditInput = defineComponent({
  emits:['DataChange'],
  setup(props,context){
    const textInput = ref('')
    const shangChuanPic = ref('')
    const picInput = ref()
    const FileList = ref([])
    const PicPreview = ref([])
    import('./shangchuan.png').then(res=>{
      shangChuanPic.value = res.default
    })
    return ()=>{
      return <main class={classes.EditInputDiv}>
        <textarea maxlength={120}  v-model={textInput.value} onInput={(e)=>{
          // 动态高度
          if(e.target){
            // @ts-ignore
            e.target.style.height =  '6rem'
            // @ts-ignore
            e.target.style.height = e.target.scrollHeight + 'px'
          }

        } } placeholder={'这一刻的想法...'} class={classes.EditInput}></textarea>
        {textInput.value}
        <div class={classes.picBody}>
          <div class={classes.EditPicInput} onTouchend={()=>{
            picInput.value.click()
          } }>
            <img src={shangChuanPic.value} />
          </div>
          {PicPreview.value.map((item,index)=>{
            return <div class={classes.previewPic}>
              <span class={classes.X} onTouchend={()=>{
                console.log('delete',index)
              } }>x</span>
              <img src={item} style={'width:100%;height:100%'} />
            </div>
          })}
        </div>
        <div>
          <input type="file" style={{display:'none'}} onChange={(e)=>{
            if( FileList.value.length >=9){
              alert('滚');
              return
            }
            // @ts-ignore
            const files = e.target.files
            // @ts-ignore
            FileList.value.push(...files)
            Array.prototype.slice.apply(files).forEach(item=>{
              // @ts-ignore
              PicPreview.value.push(window.URL.createObjectURL(item))
            })
            context.emit('DataChange',FileList)
          } } ref={picInput} multiple={true}/>
        </div>
      </main>
    }
  }
})


