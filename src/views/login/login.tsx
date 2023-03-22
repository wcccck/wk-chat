import {defineComponent,ref} from "vue";
import classes from './index.module.scss'
import {loginRequest} from '../../http/login'
import {setToken} from "../../utils/token";
import {useRouter} from "vue-router";
import useToken from '../../store/tokenStore'
import Input from "../../components/Input/Input";
import Icon from "../../components/Icon/Icon";
import useUserInfo from '../../store/UserStore'
export default defineComponent({
  setup(){
    const username = ref('')
    const password = ref('')
    const Router = useRouter()
    const TokenStore = useToken()
    const userInfo = useUserInfo()
    // 点击事件
    const clickEvent = async function (e:Event){
      if(username.value == '' || password.value== ''){
        alert('请输入用户名或者密码')
      }else{
        const result = await loginRequest({username:username.value,password:password.value})
        if(result.data && result.data.code == 200){
          const {data} = result.data
          setToken(data.myToken)
          userInfo.userInfo = data
          TokenStore.token = data.myToken
          await Router.push('/layout/message')
        }else{
          // @ts-ignore
          if (result.msg && typeof result.msg === 'string') {
            // @ts-ignore
            alert(result.msg)
          }
        }

      }
    }
    const InputType = ref('text')
    return ()=>{
      return <div class={classes.container}>
        <h2 class={classes.title}>登录</h2>
        <div>
          <form action="">
            <Input Model={username}>
              {{left:()=> <span>账号</span> }}
            </Input>
            <Input Model={password} inputType={InputType.value}>
              {{
                left:()=> <span>密码</span>,
                right:()=> <div>
                  {InputType.value == 'text' ?  <Icon IconName={'yincang'} size={'2rem'} onMyClick={(e)=>{
                    InputType.value = 'password'
                  } }></Icon> : <Icon IconName={'show'} size={'2rem'} onMyClick={(e)=>{
                    InputType.value = 'text'
                  }}></Icon>}

                </div>
              }}
            </Input>
          </form>

        </div>
        <div style={{display:"flex",justifyContent:"center"}}><Button onMyClick={clickEvent}>login</Button></div>
      </div>
    }
  }

})

// 长按钮
export const Button = defineComponent({
  emits:['myClick'],
  setup(props,context){
    const defaultSlot = context.slots.default
    const {emit} = context

    return ()=>{
      return <button style={{fontSize:"40px"}} onTouchend={(e)=>{
        emit('myClick',e)

      } } class={classes.button}>{defaultSlot?.()}</button>
    }
  }
})