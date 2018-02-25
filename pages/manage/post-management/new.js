import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Notification from "components/Notification"
import { sendPost } from "utils/request"

import { pageWrapper } from "utils/wrapper"

class ManageNewPostPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      content: ""
    }
  }

  handleCreateNewPost = () => {
    sendPost("/api/posts", null, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <Link href="/manage/post-management">
          <a><h3>Back</h3></a>
        </Link>
        <h3>Title</h3>
        <input onChange={e => this.setState({ title: e.target.value })} style={{ width: "100%", height: 32 }} />

        <h3>Content</h3>
        <textarea
          onChange={e => this.setState({ content: e.target.value })}
          style={{ backgroundColor: "#d1d1d1", borderColor: "#d1d1d1", fontSize: 14, width: "100%", minHeight: 300 }}
        /><br />
        <button onClick={() => this.handleCreateNewPost()}>Submit</button>
      </div>
    )
  }
}

export default pageWrapper(null)(ManageNewPostPage)