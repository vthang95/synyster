import { Component } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import Link from "next/link"

class MainLayout extends Component {
  render() {
    return (
      <div className="syn-layout">
        <header className="syn-header">
          <div className="syn-header__wrapper">
            <div className="logo">
              <img src="/static/images/logo1.png" width="60px" height="auto" />
            </div>

            <div className="syn-header__navbar">
              <Link href="/"><a style={{ fontSize: 28, fontWeight: 600 }}>Synyster</a></Link>
              <nav>
                <span className="nav-item">
                  <Link href="/"><a>Home</a></Link>
                </span>
                <span className="nav-item">
                  <Link href="/about"><a>About</a></Link>
                </span>
                <span className="nav-item">
                  <Link href="/projects"><a>Projects</a></Link>
                </span>
                <span  className="nav-item">
                  <Link href="/friend-sites"><a>Friend sites</a></Link>
                </span>
              </nav>
            </div>
          </div>
        </header>

        <div className="syn-layout__content">
          {this.props.children}
        </div>

        <footer className="syn-footer">
          <div className="syn-footer__wrapper">
            <span>
              Copyright © 2018 Tran Viet Thang
            </span>
            <div>
              <span>Based on cactus-dark</span>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect(null, null)(MainLayout)