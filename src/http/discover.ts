import serve from "../utils/axios";
import {SendMsgType} from "../views/discover/Pages/editPage/EditPage";

export function getAllDiscover(){
  return  serve({
    url:"/discover",
    method:"get"
  })
}

export function sendDiscover(data:Array<any>,sendMsg:SendMsgType){
  const fromDa = new FormData()
  data.forEach((item,index)=>{
    fromDa.append(`pic${index}`,item)
  })
  fromDa.append('sendMsg',JSON.stringify(sendMsg))
  return serve({
    headers:{
      "Context-Type":"multipart/form-data"
    },
    url:"/discover",
    data:fromDa,
    method:"post"
  })
}

export function commentDiscover(obj:object,id:string|number){
  return  serve({
    method:"POST",
    data:obj,
    url:`/discover/comment/${id}`
  })
}