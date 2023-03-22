import {defineComponent} from "vue";
import Icon from '../Icon/Icon'
import classes from "./Button.module.scss";
export default defineComponent({
  emits:['myClick'],
  props:{
    icon:{
      type:String,
    },
    disable:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context){
    const {emit,slots} = context

    return ()=>{
      return <button disabled={props.disable} class={classes.container} onTouchend={(e)=>{
        emit('myClick',e)
      } }>
        {props.icon? <Icon IconName={props.icon}></Icon> : ''}
        {slots.default?.()}
      </button>
    }
  }
})