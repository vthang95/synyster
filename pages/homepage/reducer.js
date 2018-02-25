import update from "immutability-helper"

const initState = {
  ui: {
    postList: [],
    categoryList: []
  },
  logic: {}
}

export default (state = initState, action) => {
  switch(action.type) {
    case "HOMEPAGE::INITIAL_HOMEPAGE_DATA": {
      const { posts, categories } = action.payload
      return update(state, { ui: { postList: { $set: posts }, categoryList: { $set: categories } } })
    }

    case "HOMEPAGE::GET_POSTS":
      return update(state, { ui: { postList: { $set: action.payload } } })
    case "HOMEPAGE::GET_CATEGORIES":
      return update(state, { ui: { categoryList: { $set: action.payload } } })
    default:
      return state
  }
}