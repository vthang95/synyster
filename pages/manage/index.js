import { Component } from "react"

import { pageWrapper } from "utils/wrapper"

class ManagePage extends Component {
  render() {
    return (
      <div className="syn-wrapper">
        <div className="syn-form">
          <h1>Welcome</h1>
        </div>
      </div>
    )
  }
}

export default pageWrapper()(ManagePage)