let initialState = {
  all: []
}

let lineReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_ALL_LINES":

    return {
      ...state,
      all: action.payload
    }

    default:
      return state
  }
}


export default lineReducer
