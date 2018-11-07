const initialState = {
  token:''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return Object.assign({}, state, { token: action.payload }) ;
    case "CLEAR_TOKEN":
      return initialState;
    default:
      return state;
  }
}
