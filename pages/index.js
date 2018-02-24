const md = `
## Quick Start

\`\`\` js
var i = 0
function goAway(arg) {
  let a = {}
  a.b = "b"

  return a
}
\`\`\`

\`\`\` ruby
def serve_drinks(%User{age: age}) when age >= 21 do
  # Code that serves drinks!
end

serve_drinks User.get("John Doe")
\`\`\`
`

import React from "react"
import { Button } from "antd"
import marked from "marked"
import hljs from "highlight.js"

import Notification from "components/Notification"
import { pageWrapper } from "utils/wrapper"

// configuration
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // do something in server here!
    let _toClient
    const { store } = ctx

    if (ctx.isServer) {
      _toClient = ctx.req._toClient
    }

    const sendString = "I Got You in Server! Dont believe? You can view page source and find me there!..."
    return { isServer: ctx.isServer, _toClient }
  }

  renderListOfPost = () => {
    if (!this.props._toClient || !this.props._toClient.posts) return
    return this.props._toClient.posts.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          <span style={{ color: "#666" }}> 14 Nov 2018 > </span>
          <a>{ele.title}</a>
        </li>
      )
    })
  }

  renderListOfCategories = () => {
    if (!this.props._toClient || !this.props._toClient.categories) return

    return this.props._toClient.categories.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          {ele.name} <span style={{ color: "#666" }}>({ele.posts.length})</span>
        </li>
      )
    })
  }

  render() {
    console.log(this.props._toClient);
    return (
      <div className="syn-content" style={{ maxWidth: 700, margin: "30px auto" }}>
        <h2 style={{ color: "#ff6786" }}>New Posts</h2>
        <div className="syn-content__posts">
          <ul style={{ padding: 0, lineHeight: "32px" }}>
            {this.renderListOfPost()}
          </ul>
        </div>

        <h2 style={{ color: "#ff6786" }}>Categories</h2>

        <div className="syn-content__posts">
          <ul style={{ padding: 0, lineHeight: "28px" }}>
            {this.renderListOfCategories()}
          </ul>
        </div>

        <div className="markdown-content">
          <div dangerouslySetInnerHTML={{ __html: marked(md) }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default pageWrapper(mapStateToProps, {  })(Index)