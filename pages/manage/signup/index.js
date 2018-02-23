import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import axios from "axios"

import Notification from "components/Notification";
import { pageWrapper } from "utils/wrapper"

class ManageSignupPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      username: "",
      password: ""
    }
  }

  handleSubmitLogin = () => {
    const url = "/api/users/signup"
    const body = Object.assign({}, this.state)
    axios({
      method: "POST",
      url,
      data: body
    })
      .then(res => {
        if (res.status === 201 && res.data.success === true) {
          Notification.success("Signup Success!")
          Router.push("/manage/login")
        } else {
          Notification.errorThen(res, "Something went wrong!", "Try again later.")
        }
      })
      .catch(err => {
        Notification.errorCatch(err, "Something went wrong!", "Try again later.")
      })
  }

  render() {
    const { email, username, password } = this.state

    return (
      <div className="syn-wrapper">
        <div className="syn-form">
          <h2>Signup</h2>
          <div className="syn-form__login">
            <label>Email</label>
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              className="syn-form__input"
            />
            <label>Username</label>
            <input
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              className="syn-form__input"
            />
            <label>password</label>
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              className="syn-form__input"
            />
            <button onClick={this.handleSubmitLogin} className="syn-form__input--btn">Signup</button>

            <div>
              <Link href="/manage/login"><a>Already have an account? Login here</a></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default pageWrapper()(ManageSignupPage)