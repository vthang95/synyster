import update from "immutability-helper"

const initState = {
  ui: {
    postList: []
  },
  logic: {}
}

export default (state = initState, action) => {
  switch(action.type) {
    case "HOMEPAGE::INITIAL_HOMEPAGE_DATA":
      return update(state, { ui: { postList: { $set: action.payload.posts } } })
    default:
      return state
  }
}