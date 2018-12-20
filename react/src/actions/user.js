import api from "../api";
import store from "../store";


export function setUser(params) {
  return dispatch => {
    return api.setToken(params)
      .then(res => {
        dispatch(setToken(res.data.token))
      })
      .then(() => {
        localStorage.setItem('TOKEN', store.getState().user.token);
        console.log(localStorage.getItem("TOKEN"));
      })
  }
}

export function setCurrentUser(params) {
  return {
    type: "SET_CURRENT_USER",
    payload: params
  }
}

export function setToken(params) {
  console.log(params);
  return {
    type: "SET_TOKEN",
    payload: params
  }
}

export function clearToken() {
  localStorage.setItem("TOKEN", "");
  return {
    type: "CLEAR_TOKEN",
  }

}