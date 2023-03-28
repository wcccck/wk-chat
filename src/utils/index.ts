import {useWindowSize } from '@vueuse/core'
import {clearToken} from "@/utils/token";
import TokenStore from "@/store/tokenStore";
export const isMobile = function (){
  const {width,height} = useWindowSize()
  window.addEventListener('resize',()=>{
    console.log(width.value)
    // console.log(height.value)
  })
  return width.value > 667 ? false : true
}

export function throttle(cb:Function,time:number){
  let timer:boolean = true
  return function (){
    if(timer){
      timer = false
        cb(...arguments)
      setTimeout(()=>{
        timer = true
      },time)
    }
  }

}

export function debounce(cb:Function,time:number){
  let timerNu: NodeJS.Timeout
  return function (){
    clearTimeout(timerNu)
    timerNu = setTimeout(()=>{
      cb(...arguments)
    },time)
  }
}




export function stringChangeObject(arr:Array<any>){
  arr.forEach((item)=>{
    for (const itemKey in item) {
      if(itemKey === 'comment'){
        item[itemKey]  =JSON.parse(item[itemKey])
      }else if(itemKey === 'msgImages'){
        item[itemKey]  =JSON.parse(item[itemKey])
      }
    }
  })
}

export  function stopDoubleClick(){
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  }, { passive: false })

// 禁用双击放大
  let lastTouchEnd = 0
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }, { passive: false })
}

export function setSessionData(data:any,key:string){
  let sessionData = JSON.stringify(data)
  sessionStorage.setItem(key,sessionData)
}

export function getSessionData(key:string){
  return sessionStorage.getItem(key) || ''
}
export function logOut(){
  clearToken()
  const store = TokenStore()
  store.token = ''
}