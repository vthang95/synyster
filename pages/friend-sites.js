import { Component } from "react"
import axios from "axios"

import { pageWrapper } from "utils/wrapper"

class RedirectPage extends Component {
  static async getInitialProps(ctx) {
    return {}
  }

  static pageInfo = {
    title: "A list of good blogs to read"
  }

  render() {
    return (
      <div className="syn-content" style={{ maxWidth: 600, margin: "30px auto" }}>

        <div className="syn-bio">
          <p>
            Các bạn mà không biết đến blog của những nhân vật này thì...
          </p>

          <ul>
            <li>
              <a href="https://thefullsnack.com" target="_blank">Snacky - https://thefullsnack.com</a>
            </li>
            <li>
              <a href="https://huydx.com/" target="_blank">Huydx - https://huydx.com/</a>
            </li>
            <li>
              <a href="https://quan-cam.com/" target="_blank">HQC quần cam - https://quan-cam.com/</a>
            </li>
          </ul>

          <p>
            ...
          </p>
        </div>
      </div>
    )
  }
}

export default pageWrapper(null)(RedirectPage)