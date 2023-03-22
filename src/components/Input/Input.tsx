import classes from './Input.module.scss'
import {defineComponent, PropType, ref, Ref} from "vue";

export default defineComponent({
  props:{
    Model:{
      type:Object as PropType<Ref<string>>,
      required:true
    },
    inputType:{
      type:String,
      default:'text'
    },
    maxLength:{
      type:Number,
      default:20
    }
  },
  setup(props,context){
    const {slots} = context
    const input = ref<HTMLInputElement>()
    return ()=>{
      return <div onClick={()=>{
        if(input.value){
          input.value?.focus()
        }
      } }>
        <div class={classes.main}>
          <div class={classes.left}>
            {slots.left?.()}
            <input ref={input} maxlength={props.maxLength} type={props.inputType} v-model={props.Model.value} />
          </div>
          <div class={classes.right}>
            {slots.right?.()}
          </div>
          <div class={classes.bottom}></div>
        </div>
      </div>
    }
  }
})