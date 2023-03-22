import serve from "../utils/axios";
export type MsgType ={
  from:string | number,
  to:string | number,
  msg:string,
  type:string,
  status:string | number
}
export function sendMessage(data:MsgType){
  return serve({
    data,
    method:"post",
    url:`/message`
  })
}

export function getReceiveMessage(id:number |string){
  return serve({
    method:"get",
    url:`/message/${id}`
  })
}