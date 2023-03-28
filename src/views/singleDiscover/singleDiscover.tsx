import {defineComponent} from "vue";
import classes from './signle.module.scss'
export  default defineComponent({
  setup(props,context){
    return ()=>{
      return <div class={classes.container}>

      </div>
    }
  }
})