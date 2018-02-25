import React from "react"
import { Button } from "antd"
import Link from "next/link"

import Notification from "components/Notification"
import { pageWrapper } from "utils/wrapper"
import { hpInitialHomepageData, hpGetPosts, hpGetCategories } from "actions"

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // do something in server here!
    let _toClient
    const { store } = ctx

    if (ctx.isServer) {
      _toClient = ctx.req._toClient
      ctx.store.dispatch(hpInitialHomepageData(_toClient))
    } else {
      ctx.store.dispatch(hpGetPosts())
      ctx.store.dispatch(hpGetCategories())
    }

    const sendString = "I Got You in Server! Dont believe? You can view page source and find me there!..."
    return { isServer: ctx.isServer }
  }

  renderListOfPost = () => {
    if (!this.props.posts) return
    return this.props.posts.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          <span style={{ color: "#666" }}> 14 Nov 2018 > </span>
          <Link href={`/posts?postSlug=${ele.slug}`} as={`/posts/${ele.slug}`}>
            <a style={{ color: "", textDecoration: "none" }}>{ele.title}</a>
          </Link>
        </li>
      )
    })
  }

  renderListOfCategories = () => {
    if (!this.props.categories) return

    return this.props.categories.map((ele) => {
      return (
        <li key={ele._id} style={{ listStyle: "none" }}>
          {ele.name} <span style={{ color: "#666" }}>({ele.posts.length})</span>
        </li>
      )
    })
  }

  renderListOfTags = () => {
    const fake = ["elixir", "js", "algorithms", "monoid"]

    return fake.map(ele => {
      return <span key={ele} style={{ padding: "3px 8px", border: "1px solid #666", marginRight: 5 }}>{ele}</span>
    })
  }

  render() {
    return (
      <div className="syn-content" style={{ maxWidth: 600, margin: "30px auto" }}>
        <div className="bio">
          <p style={{ hyphens: "auto" }}>
            My name is Tran Viet Thang. I was an auditor. But with the passion for programming, I'm starting a new road to become a software engineer.
          </p>
          <p>
            Find me
            on <a href="//facebook.com/vietthang95" target="_blank"><i className="fa fa-facebook"></i></a>
            , <a href="//github.com/vthang95" target="_blank"><i className="fa fa-github"></i></a>
          </p>
        </div>
        <h2 style={{ color: "#fb8105" }}>New Posts</h2>
        <div className="syn-content__posts">
          <ul style={{ padding: 0, lineHeight: "32px" }}>
            {this.renderListOfPost()}
          </ul>
        </div>

        <h2 style={{ color: "#fb8105" }}>Categories</h2>
        <div className="syn-content__categories">
          <ul style={{ padding: 0, lineHeight: "28px" }}>
            <li style={{ listStyle: "none" }} key="all">All <span style={{ color: "#666" }}>(0)</span></li>
            {this.renderListOfCategories()}
          </ul>
        </div>

        <h2 style={{ color: "#fb8105" }}>Tags</h2>
        <div className="syn-content__tags">
          {this.renderListOfTags()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.homepage.ui.categoryList,
    posts: state.homepage.ui.postList
  }
}

export default pageWrapper(mapStateToProps, {  })(Index)