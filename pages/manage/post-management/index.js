import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Notification from "components/Notification"
import { sendPost } from "utils/request"

import { pageWrapper } from "utils/wrapper"

class ManagePostPage extends Component {
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
    console.log(this.state);
    return (
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <input onChange={e => this.setState({ title: e.target.value })} /><br />
        <textarea onChange={e => this.setState({ content: e.target.value })} /><br />
        <button onClick={() => this.handleCreateNewPost()}>Submit</button>
      </div>
    )
  }
}

export default pageWrapper(null)(ManagePostPage)