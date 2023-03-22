import {createApp, defineComponent} from "vue";

const MsgBox = defineComponent({
  props:{
    context:{
      type:String,
      require:true
    },

  },
  setup(props,context){
    return ()=>{
      return <div style={''}>
        12532
        {props.context}
      </div>
    }
  }
})

export function MessageBox(context:string,cb:Function){
  // const div = document.createElement('div')
  // document.body.append(div)
  // createApp(MsgBox).mount(div)
}