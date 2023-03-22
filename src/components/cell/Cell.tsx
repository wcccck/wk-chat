import {defineComponent} from "vue";
import classes from './Cell.module.scss'
import Icon from "../Icon/Icon";
import {useRouter} from "vue-router";

export default defineComponent({
  emits:['wkClick'],
  props:{
    icon:{
      type:String
    },
    title:{
      type:String
    },
    to:{
      type:String
    },
    bottomBorder:{
      type:Boolean
    }
  },
  setup(props,context){
    const {slots,emit} = context
    return ()=>{
      return <div class={classes.container} onClick={(e)=>{
        emit("wkClick",e)
      } }>

        <div class={classes.left}>
          {slots.left?.()}
        </div>
        <div class={classes.right}>
          {slots.right?.()}
        </div>
        {props.bottomBorder ? <div class={classes.bottom}></div> : ''}

      </div>
    }
  }
})