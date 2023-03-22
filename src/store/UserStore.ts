import {defineStore} from "pinia";
export type UserInfo ={
  id:number | string,
  myToken:string,
  username:string,
  chatID:string,
  headImage:string,
  QRCode?:string
}
export type FriendInfo = {
  createdAt?:string,
  friend_id:string | number,
  friend_image:string,
  friend_name:string,
  id:string | number,
  user_id:string | number,
  alias?:string,
  friend_chatId:string
}
export default defineStore('userInfo',{
  state(){
    return {
      userInfo:{} as UserInfo,
      userFriend:[] as FriendInfo[]
    }
  },
  persist:{
    storage:window.localStorage
  }
})