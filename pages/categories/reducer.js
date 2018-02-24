import update from "immutability-helper"

const initState = {
  ui: {
    categoryList: []
  },
  logic: {}
}

export default (state = initState, action) => {
  switch(action.type) {
    case "HOMEPAGE::INITIAL_HOMEPAGE_DATA":
      return update(state, { ui: { categoryList: { $set: action.payload.categories } } })
    default:
      return state
  }
}