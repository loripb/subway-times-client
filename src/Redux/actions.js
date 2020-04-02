export const setUserInformation = (responseFromFetch) => {
  return {
    type: "SET_USER_INFORMATION",
    payload: responseFromFetch
  }
}

export const setAlllines = (linesArr) => {
  return {
    type: "SET_ALL_LINES",
    payload: linesArr
  }
}

export const logOut = () => {
  return {
    type: "LOG_OUT"
  }
}
