let initialState = {
  username: "",
  token: ""
}

let userReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_USER_INFORMATION":
      return {
        ...state,
        username: action.payload.user.username,
        token: action.payload.token
      }


    case "LOG_OUT":
      return {
        ...state,
        ...initialState
      }

    default:
      return state
  }
}


export default userReducer
