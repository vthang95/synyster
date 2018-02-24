import { Component } from "react"
import axios from "axios"
import marked from "marked"
import hljs from "highlight.js"

import { pageWrapper } from "utils/wrapper"

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

class PostPage extends Component {
  static async getInitialProps(ctx) {
    let postDocument
    if (ctx.isServer) {
      // TODO: need to handle _err
      postDocument = ctx.req._post
    } else {
      // TODO: Need refactor this
      const res = await axios.get(`/api/posts/${ctx.query.postSlug}`)
      if (res.data.success === true) postDocument = res.data.doc
    }
    return { postDocument }
  }

  render() {
    const postDocument = this.props.postDocument
    return (
      <div className="syn-content" style={{ maxWidth: 700, margin: "30px auto" }}>
        <h2>{ postDocument && postDocument.title }</h2>

        <div className="markdown-content">
          { postDocument && <div dangerouslySetInnerHTML={{ __html: marked(postDocument.content) }} /> }
        </div>
      </div>
    )
  }
}

export default pageWrapper(null)(PostPage)