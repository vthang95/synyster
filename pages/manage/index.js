import { Component } from "react"
import Link from "next/link"

import { pageWrapper } from "utils/wrapper"

class ManagePage extends Component {
  render() {
    return (
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <h1>Welcome to admin page</h1>

        <ul>
          <li><Link href="/manage/post-management"><a>Manage Posts</a></Link></li>
          <li>Manage Categories</li>
          <li>Manage Tags</li>
          <li>Manage Comments</li>
          <li>Analytics</li>
          <li>General setting</li>
        </ul>
      </div>
    )
  }
}

export default pageWrapper()(ManagePage)