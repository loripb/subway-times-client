let initialState = {
  username: "",
  user_stops: [],
  starred_stops: [],
  token: ""
}

let userReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_USER_INFORMATION":
      return {
        ...state,
        username: action.payload.user.username,
        user_stops: action.payload.user.stops,
        starred_stops: action.payload.user.starred_stops,
        token: action.payload.token
      }

    case "EDIT_USER_INFORMATION":
      return {
        ...state,
        username: action.payload.username,
        user_stops: action.payload.stops,
        starred_stops: action.payload.starred_stops,
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
