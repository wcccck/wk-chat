import {defineComponent, ref} from "vue";
import classes from "./profile.module.scss";
import Cell from "../../components/cell/Cell";
import Icon from "../../components/Icon/Icon";
import UserStore from "@/store/UserStore";
import {RouterView, useRouter} from "vue-router";
import {logOut} from "@/utils";
const arr = [
  {
    IconName:"box",
    title:"Favorites",
    key:"box"
  },
  {
    IconName:"tupian",
    title:"Moments",
    key:"tupian",
  },
  {
    IconName:"kabao",
    title:"Cards & Offers",
    key:"kabao",
  },
  {
    IconName:"weixiao",
    title:"Sticker Gallery",
    key:"weixiao",
  },
]
export default defineComponent({

  setup(props,context){
    return ()=>{
      return <div class={classes.container}>
        <Card></Card>
        <Cell title={'Services'}>
          {{
            left:()=>
                <div class={classes.cellBox}>
                  <Icon IconName={'weixinzhifu'} size={'1.6rem'}></Icon>
                  <span>Services</span>
                </div>,
            right:()=>
                <div>
                  <Icon IconName={'zuojiantou'} size={'1.4rem'}></Icon>
                </div>
          }
          }
        </Cell>
        <div class={classes.cardList}>
          {arr.map(item=>{
            return <Cell title={item.title} key={item.key}>
              {{
                left:()=><div class={classes.cellBox}>
                  <Icon IconName={item.IconName} size={'1.6rem'}></Icon>
                  <span>{item.title}</span>
                </div>,
                right:()=>
                    <div>
                      <Icon IconName={'zuojiantou'} size={'1.4rem'}></Icon>
                    </div>
              }}
            </Cell>
          })}
        </div>
        <Cell title={'Settings'} onWkClick={()=>{
          logOut()
        } }>
          {{
            left:()=>
                <div class={classes.cellBox}>
                  <Icon IconName={'shezhi'} size={'1.6rem'}></Icon>
                  <span>Log Out</span>
                </div>,
            right:()=>
                <div>
                  <Icon IconName={'zuojiantou'} size={'1.4rem'}></Icon>
                </div>
          }
          }
        </Cell>
      </div>
    }
  }
})

const Card = defineComponent({
  setup(props,context){
    const userInfo = UserStore().userInfo
    const Router = useRouter()
    return ()=>{
      return <div class={classes.CardContainer} onClick={()=>{
        Router.push('/layout/profile/editPage')
      } }>
        <div class={classes.cardLeft}>
          <img src={userInfo.headImage}/>
        </div>
        <div class={classes.cardCenter}>
          <div class={classes.username}>username</div>
          <div class={classes.chatID}>chat ID:{userInfo.chatID}</div>
         <button>+ Status</button>
        </div>
        <div class={classes.cardRight}></div>
        <RouterView></RouterView>
      </div>
    }
  }
})