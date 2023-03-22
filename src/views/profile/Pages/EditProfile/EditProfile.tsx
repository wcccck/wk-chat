import {defineComponent} from "vue";
import classes from './EditProfile.module.scss'
import Cell from "@/components/cell/Cell";
import Icon from "@/components/Icon/Icon";
import userStore from "@/store/UserStore";
import {useRouter} from "vue-router";
export default defineComponent({
  setup(props,context){
    const userInfo = userStore().userInfo
    return ()=>{
      return <div class={classes.container}>
        <Header></Header>
        <Cell title={userInfo.headImage} onWkClick={()=>{
          console.log('修改头像')
        }}>
          {{left:()=> <div>Profile Photo</div>,right:()=><div class={classes.CellRight}>
              <img class={classes.HeadImg} src={userInfo.headImage}/>
              {/*{item.text}{item.img? <img class={classes.HeadImg} src={item.img}/> :'' }*/}
            </div> } }
        </Cell>

        <Cell title={userInfo.username} onWkClick={()=>{
          console.log('修改姓名')
        }}>
          {{left:()=> <div>Name</div>,right:()=><div class={classes.CellRight}>
              {userInfo.username}
            </div>}}
        </Cell>
        <Cell title={userInfo.chatID} onWkClick={()=>{
          console.log('修改chatID')
        }}>
          {{left:()=> <div>Chat_ID</div>,right:()=><div class={classes.CellRight}>
              {userInfo.chatID}
            </div>}}
        </Cell>
        <Cell title={userInfo.QRCode} onWkClick={()=>{
          console.log('修改QRCode')
        }}>{{left:()=> <div>My QR Code</div>,right:()=><div class={classes.CellRight}>unDev</div>}}
        </Cell>
      </div>
    }
  }
})

const Header = defineComponent({
  // emits:['EditPageHide'],
  setup(props,context){
    const router = useRouter()
    return ()=>{
      return <div class={classes.EditHeader}>
        <div class={classes.EditLeft} onClick={()=>{
          // context.emit('EditPageHide')
          router.back()
        }}>
          <Icon IconName={'zuojiantou'} size={'1.5rem'}></Icon>
        </div>
        <div class={classes.EditCenter}>
          MyProfile
        </div>
      </div>
    }
  }
})