import {computed, defineComponent, PropType, ref} from "vue";
import classes from './FriendCard.module.scss'

export type cardInfoType = {
  headImage:string,
  author_name:string,
  author_id:string | number,
  msgText:string,
  createdAt?:string,
  comment:Array<any>
}

function dataFormat(data?:string){
  const first = data?.split('T')[0]
  const last = data?.split('T')[1]
  const current = first + '---' + last

  return current
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

          <div class={classes.timeAndBtn}>
            {/*发布时间*/}
            <div>{dataFormat(cardInfo.createdAt)}</div>

            {/*输入库*/}
            <div class={classes.showInputDiv}  onTouchend={(e) => {
              context.emit('showInput', {e,authorId:cardInfo.author_id})
            }}>
              ··
          </div>

          </div>
          {/*评论区*/}
          <div class={classes.comment}>
            {cardInfo.comment ? cardInfo.comment.map(item=>{
              return <div><span class={classes.commentName}>{item.name}</span>:   {item.msg}</div>
            }) : ''}
          </div>

        </div>
        <div class={classes.bottomLine}></div>
      </div>
    }
  }
})

