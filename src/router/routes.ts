import {RouteRecordRaw} from "vue-router";
import {getToken} from "../utils/token";
const routes:RouteRecordRaw[] = [
   {
    path:'/',
    redirect:'/layout/message'
  },
  {
    path:'/layout',
    component:()=> import('@/views/layout/layout'),
    children:[
      {
        path:'/layout/single',
        component: ()=> import('@/views/singleDiscover/singleDiscover'),
        name:"SingleDiscover"
      },
      {
        path:'/layout/userInfo',
        component:()=> import('@/views/userInfo/UserInfo'),
        name:"UserInfo"
      },
      {
        path:"/layout/chat",
        component:()=> import('@/views/chatPage/chat'),
        name:"Chat"
      },
      {
        path:'/layout/message',
        component:()=> import('@/views/message/message'),
        name:"index"
      },
      {
        path:'/layout/address',
        component:()=> import('@/views/address/address'),
        name:'Address'
      },
      {
        path:'/layout/discover',
        component:()=> import('@/views/discover/discover'),
        name:'Discover'
      },
      {
        path:'/layout/profile',
        component:()=> import('@/views/profile/profile'),
        name:'Profile',
        children:[
          {path:'/layout/profile/editPage',component:()=>import('@/views/profile/Pages/EditProfile/EditProfile'),
          name:"EditPage"}
        ]
      },
    ]
  },
    {
      path:'/login',
      component:()=> import('@/views/login/login'),
      beforeEnter:(to,from,next)=>{ // 如果有token 就别来沾边
        const token = getToken()
        if(token && token !== ''){
          next(false)
        }else {
          next()
        }
      }
    },

]

export default routes