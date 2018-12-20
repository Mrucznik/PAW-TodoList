import axios from "axios";
import store from "../store";

const url = "http://5.133.9.55:8080/";

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

  getCurrentUse(){
    this.setHeaders();
    return this.api.get('user');

  }

 // ##### BOARDS #####

  getAllBoards(){
    this.setHeaders();
    return this.api.get('boards');
  }

  createNewBoard(params){
    this.setHeaders();
    return this.api.post('boards', params);
  }

  updateBard(id, params){
    this.setHeaders();
    return this.api.patch('boards/' + id, params);
  }

  getSingleBoard(id){
    this.setHeaders();
    return this.api.get('boards/' + id +"/lists");
  }

  createNewList(id, params){
    this.setHeaders();
    return this.api.post('boards/' + id +'/lists', params);
  }

  getSingleBoardWithCards(id){
    this.setHeaders();
    return this.api.get('boards/' + id +"/lists/cards");
  }

   // ##### CARDS #####

   getAllCards(){
    this.setHeaders();
    return this.api.get('cards');
  }

  getSingleCard(id){
    this.setHeaders();
    return this.api.get('cards/' + id);
  }

  updateCard(id, params){
    this.setHeaders();
    return this.api.patch('cards/' + id, params);
  }
    // COMMENT
  getCardComment(id){
    this.setHeaders();
    return this.api.get('cards/' + id + '/comments');

  }
  
  createCardComment(id, params){
    this.setHeaders();
    return this.api.post('cards/' + id + '/comments', params);
  }

  copyCard(id){
    this.setHeaders();
    return this.api.post('cards/' + id + '/copy');
  }

    // TASK LISTS
  getAllTaskListFromCard(id){
    this.setHeaders();
    return this.api.get('cards/' + id + '/tasklists');
  }

  createNewTaskList(id, params){
    this.setHeaders();
    return this.api.get('cards/' + id + '/tasklists', params);
  }

  deleteTaskList(id){
    this.setHeaders();
    return this.api.delete('tasklists/' + id);
  }

  updateTaskList(id, params){
    this.setHeaders();
    return this.api.patch('tasklists/' + id, params);
  }

  // TASK LIST ITEMS

  createNewTaskListItem(id, params){
    this.setHeaders();
    return this.api.post('tasklists/' + id + '/tasklistItems', params);
  }

  deleteNewTaskListItem(id){
    this.setHeaders();
    return this.api.delete('tasklistItems/' + id);
  }

  updateNewTaskListItem(id, params){
    this.setHeaders();
    return this.api.patch('tasklistItems/' + id, params);
  }

  // ##### LIST #####

  getAllLists(){
    this.setHeaders();
    return this.api.get('lists');
  }

  getList(id){
    this.setHeaders();
    return this.api.get('lists/' + id);
  }

  updateList(id, params){
    this.setHeaders();
    return this.api.patch('lists/' + id, params);
  }

  getListCards(listId){
    this.setHeaders();
    return this.api.get('lists/' + listId + '/cards');
  }

  createNewCardInList(listId, params){
    this.setHeaders();
    return this.api.post('lists/' + listId + '/cards', params);
  }

  getCardsOrderInList(listId){
    this.setHeaders();
    return this.api.get('lists/' + listId + '/cards/order');
  }

  updateCardsOrderInList(listId, params){
    this.setHeaders();
    return this.api.post('lists/' + listId + '/cards/order', params);
  }

  // #### HISTORY

  getBoardActionHistory(id){
    this.setHeaders();
    return this.api.get('history/boards/' + id);
  }

  getCurrentUserActionHistory(){
    this.setHeaders();
    return this.api.get('history/users');
  }

  getSelectUserActionHistory(id){
    this.setHeaders();
    return this.api.get('history/user/' + id);
  }

}

export default Api;