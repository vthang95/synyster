import React from "react"
import { Button } from "antd"
import Link from "next/link"

import Notification from "components/Notification"
import { pageWrapper } from "utils/wrapper"
import { hpInitialHomepageData } from "actions"

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // do something in server here!
    let _toClient
    const { store } = ctx

    if (ctx.isServer) {
      _toClient = ctx.req._toClient
      ctx.store.dispatch(hpInitialHomepageData(_toClient))
    }

    const sendString = "I Got You in Server! Dont believe? You can view page source and find me there!..."
    return { isServer: ctx.isServer }
  }

  renderListOfPost = () => {
    if (!this.props.posts || !this.props.posts.postList) return
    return this.props.posts.postList.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          <span style={{ color: "#666" }}> 14 Nov 2018 > </span>
          <Link href={`/posts?postSlug=${ele.slug}`} as={`/posts/${ele.slug}`}><a>{ele.title}</a></Link>
        </li>
      )
    })
  }

  renderListOfCategories = () => {
    if (!this.props.categories || !this.props.categories.categoryList) return

    return this.props.categories.categoryList.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          {ele.name} <span style={{ color: "#666" }}>({ele.posts.length})</span>
        </li>
      )
    })
  }

  render() {
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
      </div>
    )
  }
}

// const md = `
// ## Quick Start

// \`\`\` js
// var i = 0
// function goAway(arg) {
//   let a = {}
//   a.b = "b"

//   return a
// }
// \`\`\`

// \`\`\` ruby
// def serve_drinks(%User{age: age}) when age >= 21 do
//   # Code that serves drinks!
// end

// serve_drinks User.get("John Doe")
// \`\`\`
// `

const mapStateToProps = state => {
  return {
    categories: state.categories.ui,
    posts: state.posts.ui
  }
}

export default pageWrapper(mapStateToProps, {  })(Index)