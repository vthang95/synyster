import { Component } from "react"
import axios from "axios"

import { pageWrapper } from "utils/wrapper"

class ProjectPage extends Component {
  static async getInitialProps(ctx) {
    return {}
  }

  render() {
    return (
      <div className="syn-content" style={{ maxWidth: 600, margin: "30px auto" }}>

        <div className="syn-bio">
          Not done yet
        </div>
      </div>
    )
  }
}

export default pageWrapper(null)(ProjectPage)