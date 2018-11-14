import axios from "axios";
import store from "../store";

const url = "http://localhost:8080/";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: url,
      created:false
    });
  }

  setHeaders() {
    this.api.defaults.headers.common['authorization'] = `Bearer ${store.getState().user.token}`;
  }

  setToken(userData) {
    this.setHeaders();
    return this.api.post("/users/login", userData);
  }

  createUser(params){
    this.setHeaders();
    return this.api.post('users/register', params);
  }

  getBoards(){
    this.setHeaders();
    return this.api.get('boards');
  }

  getSingleBoard(id){
    this.setHeaders();
    return this.api.get('boards/' + id +"/lists/cards");
  }
}

export default Api;