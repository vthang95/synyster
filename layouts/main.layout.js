import { Component } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import Link from "next/link"

class MainLayout extends Component {
  render() {
    return (
      <div className="main-layout" style={{ margin: "0 10px" }}>
        <header className="main-layout-bio" style={{ maxWidth: 600, margin: "62px auto 0px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div className="nav" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 20 }}>
              <div className="logo">
                <img src="/static/images/logo1.png" width="60px" height="auto" />
              </div>

              <div style={{ margin: "0px 25px", lineHeight: "25px" }}>
                <Link href="/"><a style={{ fontSize: 28, fontWeight: 600 }}>Synyster</a></Link>
                <div>
                  <span style={{ color: "#ff6786", padding: "0 15px 0 0", borderRight: "1px solid #666" }}>Home</span>
                  <span style={{ color: "#ff6786", padding: "0 15px", borderRight: "1px solid #666" }}>About</span>
                  <span style={{ color: "#ff6786", padding: "0 15px", borderRight: "1px solid #666" }}>Projects</span>
                  <span style={{ color: "#ff6786", padding: "0 15px" }}>Redirect</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-layout-content">
          {this.props.children}
        </div>

        <footer style={{ maxWidth: 600, margin: "0 auto", height: "auto" }}>
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