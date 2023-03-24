import {defineComponent, nextTick, onMounted, PropType, ref, withModifiers} from "vue";
import classes from './mailCard.module.scss'
// import {cardType} from "./cardInfo";
import userStore, {FriendInfo} from "../../store/UserStore";
import Icon from "../Icon/Icon";



export default defineComponent({
  emits:['myClick'],
  props:{
    cardInfo:{
      type:Object as PropType<FriendInfo>
    },
    lastMsg:{
      type:String
    },
    unReadNum:{
      type:Number
    }
  },
  setup(props,context){
    const {emit} = context
    const container = ref()
    const startSlide = ref(false)
    nextTick(()=>{
      // dom渲染结束 开放滑动按钮
      startSlide.value = true
    })
    const startSide = ref(0)
    function cardMove (e:TouchEvent){
      // e.preventDefault()
      if(!startSlide.value) return
      let space = e.targetTouches[0].clientX - startSide.value // 向左或者向右移动的距离 一次
      const left = Math.trunc( Number(container.value.style.left.split('p')[0]))
      if(left >= -220 && left <= 0){
        container.value.style.left = space + 'px'
        const left = Number(container.value.style.left.split('p')[0]) // 再次获得
        if(left < -220){
          container.value.style.left = -220 + 'px'
        }else if(left > 0){
          container.value.style.left = 0 + 'px'
        }
      }


    }
    function cardStart (e:TouchEvent){
      // e.preventDefault()
      if(!startSlide.value) return
      const left = Math.trunc( Number(container.value.style.left.split('p')[0]))
      startSide.value = e.targetTouches[0].clientX
      if(left == -220){
        startSide.value += 220
      }
    }
    function cardEnd(e:TouchEvent){
      // e.preventDefault()
      if(!startSlide.value) return
      startSide.value = 0
      let left =  Math.trunc(Number(container.value.style.left.split('p')[0]))
      startSlide.value = false
      if(left < -100){
        let set = setInterval(()=>{
          if(left <= -220) {
            container.value && (container.value.style.left = -220+'px')
            clearInterval(set)
          }
          container.value && (container.value.style.left = left-- + 'px')
          startSlide.value = true
        })
      }else{
        let set = setInterval(()=>{
          if(left>=0){
            console.log(2)
            container.value && ( container.value.style.left = 0+'px')
            clearInterval(set)
          }
          container.value &&(  container.value.style.left = (left++) + 'px')
          startSlide.value = true
        })
      }

    }
    return ()=>{
      return (
        <div class={classes.main} onClick={()=>{
          emit('myClick')
        }}>

          <div class={classes.body}  style={{left:"0px"}} ref={container} onTouchstart={cardStart} onTouchmove={cardMove}
               onTouchend={cardEnd} >
            <div class={classes.left}>
              <img src={props.cardInfo?.friend_image} class={classes.headImage}/>
              {props.unReadNum ? <div class={classes.redCircle}>
                <span>{props.unReadNum}</span>
              </div>: ''}
            </div>
            <div class={classes.right}>
              <div class={classes.fromTitle}>
                {props.cardInfo?.alias? props.cardInfo.alias : props.cardInfo?.friend_name}
              </div>
              <h3 class={classes.LineMessage}>{props.lastMsg}
              </h3>
            </div>
            <div class={classes.deleteBtn} onClick={withModifiers (()=>{
              console.log('delte')
            },['stop'])}>
              <Icon IconName={'close'} size={'1.6rem'}></Icon>
            </div>
          </div>
          <div class={classes.bottom}></div>
        </div>
      )
    }
  }
})