export const setUserInformation = (responseFromFetch) => {
  return {
    type: "SET_USER_INFORMATION",
    payload: responseFromFetch
  }
}
