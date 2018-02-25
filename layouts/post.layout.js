import { Component } from "react"
import Router from "next/router"
import Link from "next/link"

class PostLayout extends Component {
  render() {
    return (
      <div className="syn-layout">
        <header className="syn-header">
          <div className="syn-header__wrapper">
            <div className="logo">
              <img src="/static/images/guitar.png" width="60px" height="auto" />
            </div>

            <div className="syn-header__navbar">
              <Link prefetch href="/"><a style={{ fontSize: 28, fontWeight: 600 }}>Synyster</a></Link>
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

export default PostLayout