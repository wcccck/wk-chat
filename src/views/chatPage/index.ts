import {MsgInfoType} from "../../MsgInfoType";
import userStore from "../../store/UserStore";
import {MsgDataType} from '../message/message'
import MessageStore from "@/store/MessageStore";

export function changeArr(arr:Array<MsgInfoType>):Array<MsgDataType>{
  const id = userStore().userInfo.id
  const newArr:MsgDataType[] = []
  const dataObj:Record<number, Array<MsgInfoType>> = {}
  arr.forEach((item,index)=>{ // 数据格式转换
    const to = item.from !== id ? item.from : item.to // 先转换成obj 再转换成Arr
    if(!dataObj[to]){
      dataObj[to] = []
    }
    dataObj[to].push(item)
  })
  for (let dataObjKey in dataObj) {
    newArr.push({
      toId:dataObjKey,
      data:dataObj[dataObjKey]
    })
  }
  newArr.forEach((item,index)=>{
    item.data = item.data.filter((item2,index2,arr)=>{
      if(item2.from == id){ // send
        return item2.type == 0
      }else if(item2.to == id){ // receive
        return item2.type == 1
      }
    })
  })
  console.log(newArr)
  return newArr
}

// /**
//  * 通过id设置当前chat数据
//  * @param id
//  */
// export function setCurrenArrByFriendID(id:string|number){
//   const msgStore = MessageStore()
//   // msgStore.currentMsgArr
// }