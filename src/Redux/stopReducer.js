let initialState = {
  all: []
}

let stopReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_ALL_STOPS":

    return {
      ...state,
      all: action.payload
    }

    default:
      return state
  }
}


export default stopReducer
