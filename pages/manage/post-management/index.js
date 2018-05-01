import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Notification from "components/Notification"
import { sendPost, sendGet } from "utils/request"

import { pageWrapper } from "utils/wrapper"

class ManagePostPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      content: "",
      posts: []
    }
  }

  componentDidMount() {
    sendGet("/api/posts")
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          this.setState({ posts: res.data.docs })
        } 
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleEditPost = (el) => {
    return function() {
      
    }
  }

  renderPosts() {
    const posts = this.state.posts
    if (!Array.isArray(posts) || posts.length === 0) return
    return posts.map((el, idx) => {
      return (
        <li key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{el.title}</span>
          <span onClick={this.handleEditPost(el)}><a>Edit</a></span>
        </li>
      )
    })
  }

  render() {
    return (
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <Link href="/manage">
          <a><h3>Back</h3></a>
        </Link>

        <Link href="/manage/post-management/new">
          <a><h3>Create new post</h3></a>
        </Link>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

export default pageWrapper(null)(ManagePostPage)
