import { Component } from "react"
import { connect } from "react-redux"

class MainLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <div className="main-layout-bio" style={{ textAlign: "center" }}>
          <h1>vthangit</h1>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(null, null)(MainLayout)