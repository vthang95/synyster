import { sendGet } from "utils/request"

// hp prefix
export const hpInitialHomepageData = _toClient => {
  return {
    type: "HOMEPAGE::INITIAL_HOMEPAGE_DATA",
    payload: _toClient
  }
}

export const hpGetPosts = () => {
  return (dispatch) => sendGet("/api/posts")
    .then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch({
          type: "HOMEPAGE::GET_POSTS",
          payload: res.data.docs
        })
      }
    })
    .catch(err => {
      // TODO: HANDLE error
    })
}

export const hpGetCategories = () => {
  return (dispatch) => sendGet("/api/categories")
    .then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch({
          type: "HOMEPAGE::GET_CATEGORIES",
          payload: res.data.docs
        })
      }
    })
    .catch(err => {
      // TODO: HANDLE error
    })
}