import { Component } from "react"
import { connect } from "react-redux"
import Router from "next/router"

class MainLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <div className="main-layout-bio" style={{ textAlign: "center", margin: 30 }}>
          <h1 onClick={() => Router.push("/")}>cactus</h1>
          <div className="bio-text" style={{ maxWidth: 500, margin: "auto" }}>
            Welcome to my blog! This is your very first post. Check documentation for more info.
            If you get any problems when using Synyster, you can find the answer in troubleshooting or you can ask me on GitHub.
          </div>
        </div>
        <br />
        {this.props.children}

        <footer style={{ maxWidth: 700, margin: "0 auto", height: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", padding: "10px 0" }}>
            <span>
              Copyright © 2018 Tran Viet Thang
            </span>
            <div>
              <span>Based on cactus-dark theme</span>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect(null, null)(MainLayout)