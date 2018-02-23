import { Component } from "react"
import { connect } from "react-redux"

class ManagementLayout extends Component {
  render() {
    return (
      <div className="manage-layout">
        {this.props.children}
      </div>
    )
  }
}

export default connect(null, null)(ManagementLayout)