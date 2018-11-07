export function setToken(params){
  console.log(params)
  return {
    type:"SET_TOKEN",
    payload:params
  }
}

export function clearToken(){
  return {
    type:"CLEAR_TOKEN",
  }

}