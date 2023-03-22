import {defineComponent} from "vue";
import classes from './EditContact.module.scss'
import Button from "@/components/button/Button";
import Icon from "@/components/Icon/Icon";
export default defineComponent({
  emits:['cancel'],
  setup(props,context){
    return ()=>{
      return <div class={classes.container}>
        <Header onCancel={()=>{
          context.emit('cancel')
        }} onDone={()=>{
          console.log('完成')
          context.emit('cancel')
        } }></Header>
        <h3>Edit Contact</h3>
        <Item title={'Remark'}></Item>
        <Item title={'Tags'}>
          <div class={classes.tagContainer} onTouchend={()=>{
            console.log(123)
          } }>
            <span>Add tags</span>
            <Icon IconName={'right'} size={'1.4rem'}></Icon>
          </div>
        </Item>
        <Item title={'Mobile number'}>
          <div class={classes.mobileBox}>
            <Icon IconName={'addto'} size={'1.6rem'}></Icon>
            <span>Add mobile number</span>
          </div>
        </Item>
        <Item>
          <div class={classes.mobileBox}>
            <Icon IconName={'delTag'} size={'1.6rem'}></Icon>
            <input type="text" placeholder={'enter mobile number'}/>
          </div>
        </Item>
      </div>
    }
  }
})

const Header = defineComponent({
  emits:['cancel','done'],
  setup(props,context){
    return ()=>{
      return <header>
        <button onTouchend={(e)=>{
          context.emit('cancel',e)
        } } class={classes.cancelBtn}>Cancel</button>
        <Button onMyClick={(e)=>{
          context.emit('done',e)
        } }>Done</Button>
      </header>
    }
  }
})


const Item = defineComponent({
  props:{
    title:{
      type:String
    }
  },
  setup(props,context){
    return ()=>{
      return <div class={classes.ItemDiv}>
        <div>
          <div class={classes.ItemTitle}>{props.title}</div>
          <div class={classes.ItemBox}>
            {props.title == 'Remark' ? <input type="text" placeholder={'enter remark'}/> : context.slots.default?.()}
          </div>
        </div>
      </div>
    }
  }
})
