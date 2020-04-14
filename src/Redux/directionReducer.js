let initialState = {
  direction: "N"
}

let directionReducer = (state = initialState, action) => {
  switch (action.type) {

    case "CHANGE_DIRECTION":

    return {
      ...state,
      direction: state.direction === "N" ? "S" : "N"
    }

    default:
      return state
  }
}


export default directionReducer
