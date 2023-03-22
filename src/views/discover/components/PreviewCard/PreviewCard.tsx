import {defineComponent} from "vue";
import classes from './Preview.module.scss'
export default defineComponent({
  setup(props,context){
    let num = 3;
    return ()=>{
      return <div class={classes.container}>
        <div class={classes.left}>
          17 Mar
        </div>
        <div class={classes.right}>
          {/*此处三种布局*/}
          <div class={classes}>
            <img class={classes.Imag} src="http://localhost/head.jpg"/>
          </div>
          <div class={classes.text}>吃火锅</div>
        </div>
      </div>
    }
  }
})