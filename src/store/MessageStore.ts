import {defineStore} from "pinia";
import {MsgInfoType} from "@/MsgInfoType";

const store = defineStore('MsgStore',{
  state(){
    return{
      currentMsgArr:[] as MsgInfoType[],
      MsgSSE:[] as any,
      currentToId:0 as string | number
    }
  },
  persist:{
    storage:window.localStorage
  }

})

export default store