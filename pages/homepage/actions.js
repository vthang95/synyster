import axios from "axios"

// hp prefix
export const hpInitialHomepageData = _toClient => {
  return {
    type: "HOMEPAGE::INITIAL_HOMEPAGE_DATA",
    payload: _toClient
  }
}

export const hpGetPosts = () => {
  console.log("here");
  return (dispatch) => axios.get("/api/posts")
    .then(res => {
      console.log(res);
      if (res.status === 200 && res.data.success === true) {
        console.log("hẻ");
        dispatch({
          type: "HOMEPAGE::GET_POSTS",
          payload: res.data.docs
        })
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      // TODO: HANDLE error
    })
}

export const hpGetCategories = () => {
  return (dispatch) => axios.get("/api/categories")
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