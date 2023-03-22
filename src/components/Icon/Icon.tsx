import {computed, defineComponent} from "vue";

import classes from './Icon.module.scss'
export default defineComponent({
  emits:['myClick'],
  props:{
    IconName:{
      type:String,
      required:true
    },
    size:{
      type:String,
      default:"1rem"
    },
    IconColor:{
      type:String,
      default:""
    }
  },
  setup(props,context){
    const {emit} =context
    const LastName = computed(()=>{
      return `#icon-${props.IconName}`
    })
    return ()=>{
      return   <svg aria-hidden='true' class={classes.iconSvg} style={{width:props.size}} onTouchend={(e)=>{emit('myClick',e)} }>
        {/*<use xlink:href={LastName.value}   fill='red'/>*/}
        <use xlinkHref={LastName.value}   fill='red'/>
      </svg>
    }
  }

})