import {defineComponent, PropType, ref} from "vue";
import classes from './FriendCard.module.scss'

export type cardInfoType = {
  headImage:string,
  author_name:string,
  author_id:string | number,
  msgText:string,
  createdAt?:string,
  comment:Array<any>
}


export default defineComponent({
  emits:['shadeImgShow','showInput'],
  props:{
    imgUrl:{
      type:Array as PropType<Array<string>>,
      required:true
    },
    cardInfo:{
      type:Object as PropType<cardInfoType>,
      required: true
    }
  },
  setup(props,context){
    const cardInfo:cardInfoType = props.cardInfo!
    console.log(cardInfo)
    return ()=>{
      return <div class={classes.container} >
        <div class={classes.left}>
          <img src={cardInfo.headImage} class={classes.Image}/>
        </div>

        <div class={classes.center}>
          <div class={classes.username}>{cardInfo.author_name}</div>
          <div class={classes.msg}>{cardInfo.msgText}</div>
          <div class={classes.imgs}>
            {props.imgUrl.map((item)=>{
              return <img src={item} class={classes.img}  onClick={(e) => {
                const {emit} = context
                emit('shadeImgShow',((e.target) as HTMLImageElement).src)
              }}/>
            })}

          </div>
          {/*发布时间*/}
          <div>
            <div>{cardInfo.createdAt}</div>
          </div>
          {/*输入库*/}
          <div class={classes.showInputDiv}>
            <button class={classes.showInput} onTouchend={(e) => {
              context.emit('showInput', {e,authorId:cardInfo.author_id})
            }}>...
            </button>
          </div>
          {/*评论区*/}
          <div>
            {cardInfo.comment ? cardInfo.comment.map(item=>{
              return <div>{item.name}:   {item.msg}</div>
            }) : ''}
          </div>

        </div>

      </div>
    }
  }
})

