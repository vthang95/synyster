const getUserFromRequest = req => {
  if (req) return req.userServer;
  const dataToShow = localStorage.getItem('user');
  const dataObject = JSON.parse(dataToShow);
  return dataObject;
}

const isInManagementPage = ({ req, isServer }) => {
  const condition = req && req._parsedUrl && req._parsedUrl.pathname &&
                    typeof req._parsedUrl.pathname === "string" &&
                    req._parsedUrl.pathname.indexOf("/manage") >= 0

  if (condition) return true
  if (!isServer && typeof window !== "undefined") return location.pathname.indexOf("/manage") !== -1
  return false
}

module.exports = {
  getUserFromRequest,
  isInManagementPage
}