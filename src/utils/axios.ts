import axios from "axios";
import useTokenStore from '../store/tokenStore'
import {setToken} from "./token";
const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL)
const serve = axios.create({
  baseURL:BASE_URL,
  timeout:1000
})


serve.interceptors.response.use((res)=>{
  return res
},
    err=>{
      const tokenStore = useTokenStore()
      console.log()
      if(err.response.data.code && err.response.data.code==401){
        tokenStore.token = ''
        setToken('')
      }
  return err.response.data
})

serve.interceptors.request.use((config)=>{
  // console.log(config)
  const tokenStore = useTokenStore()
  if(tokenStore.token){
    config.headers['token'] = tokenStore.token
  }
  return config
},(error)=>{
  return error
})
export default serve

