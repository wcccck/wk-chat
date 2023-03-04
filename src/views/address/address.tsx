import {defineComponent, nextTick, Ref, ref, watch,onUpdated} from "vue";
import Cell from "../../components/cell/Cell";
import {getFriend} from '../../http/address'
import userStore from "../../store/UserStore";
import Icon from "../../components/Icon/Icon";
import classes from './address.module.scss'
import pinyin from "pinyin/lib/pinyin-web";
import BScroll from "better-scroll";

export default defineComponent({
  setup(props,context){
    const user = userStore()
    // @ts-ignore
    const id = user.userInfo.id!
    const friendList = ref([])

    const addressList:Ref<Array<Record<string, Array<any>>>> = ref([])
    getFriend(id).then(res=>{
      friendList.value = res.data.data
    })
    watch(friendList,(newValue,oldValue)=>{
      friendList.value.forEach((item)=>{
        // @ts-ignore
        const username:string = item.friend_name
        let uni =  username.charCodeAt(0)
        let firstChar:string
        // 获得首字母
        if(uni > 40869 || uni < 19968){
          firstChar = username.slice(0,1).toUpperCase()
        }else{
          const s =pinyin(username)[0][0].slice(0,1)
          firstChar = s.toUpperCase()
        }
        const a = addressList.value.find(item=>{
          return Object.keys(item)[0] == firstChar
        })
        if(a){
          a[firstChar].push(item)
        }else{
          addressList.value.push({[firstChar]:[item]})
        }


      })
      addressList.value.sort((a,b)=>{// console.log(a)
        if(Object.keys(a)[0] < Object.keys(b)[0]){
          return -1
        }else{
          return 1
        }
      })

    })
    const ctx = ref()
    const letterArr = ref<Array<string>>([])
    const scroll = ref({})
    const startY = ref(0)

    onUpdated(()=>{
      scroll.value = new BScroll(ctx.value,{
        click: true,
        probeType:3
      })
    })
    return ()=>{
      return <div class={[classes.container]}  >
        <div class={classes.header}>
          通讯录
          <Icon IconName={'addFriend'} size={'1.3rem'} class={classes.addFriend} onMyClick={() => {
            console.log('2341')
          }}></Icon>
        </div>
        <div class={['wrapper',classes.wrapper]}   ref={ctx}>
          <div>
          {addressList.value.map(item=>{
            const key = Object.keys(item)[0]
            const arr = item[key]
            key && letterArr.value.push(key)
            return  <div>
              <div class={classes.ItemTitle} id={key}>{key}</div>
              {arr.map((el,index)=>{
                return <Cell icon={'youxiang'} title={`${item.id}`} >
                  {{
                    left:()=>{
                      return <div class={classes.cellLeftSlot}>
                        <img class={classes.headImage} src={el.friend_image}/>
                        <div class={classes.textContainer}>
                          <div style={{fontWeight:"800"}}>{el.friend_name}</div>
                        </div>
                      </div>
                    }
                  }}
                </Cell>
              } )}

            </div>
          })}

          </div>
        </div>
        {/*@ts-ignore*/}
        <ListPick  onMyTouchstart={(e)=>{
          const item = document.getElementById(e.item)
          scroll.value.scrollToElement(item)
        }} onMyTouchMove={(e)=>{

        }
        } arr={letterArr.value}  onMyClick={(e)=>{
          const item = document.getElementById(e.item)
          console.log(ctx.value)
        } }></ListPick>
      </div>
    }
  }
})


const ListPick = defineComponent({
  props:{
    arr:{
      type:Array
    }
  },
  setup(props, {emit}) {

    return () => {
      return <div class={classes.ListPick} onTouchmove={(e)=>{
        emit('myTouchMove', e)
      } }>
        {props.arr && props.arr.map((item)=>{
          return <div  onTouchstart={(e)=>{
            emit('myTouchstart',{e,item})
          } }  onTouchend={(e)=>{
            emit('myClick', {e,item})

          } }>{item}</div>
        })}
      </div>
    }
  }
})