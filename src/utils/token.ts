export const getToken = function (){
  return localStorage.getItem('token')
}

export const setToken = function (JWt:string){
  localStorage.setItem('token',JWt)
  if(JWt !== '' && JWt){
    localStorage.setItem('currentTime',Date.now().toString())
  }
}

export const clearToken = function (){
  localStorage.removeItem('token')
}