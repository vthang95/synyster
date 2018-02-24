// hp prefix
export const hpInitialHomepageData = _toClient => {
  return {
    type: "HOMEPAGE::INITIAL_HOMEPAGE_DATA",
    payload: _toClient
  }
}