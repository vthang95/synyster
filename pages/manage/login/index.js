import { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Notification from "components/Notification"
import axios from "axios"

import { pageWrapper } from "utils/wrapper"

class ManageLoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmitLogin = () => {
    axios({
      method: "POST",
      url: "/api/users/login",
      data: { ...this.state }
    })
      .then(res => {
        if (res.status === 200 && res.data.success === true) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", JSON.stringify(res.data.user))
          Notification.success("Login success!")
          Router.replace("/manage")
        } else {
          Notification.errorThen(res, "Something went wrong!", "Try again later.")
        }
      })
      .catch(err => {
        Notification.errorCatch(err, "Something went wrong!", "Try again later.")
      })
  }

  render() {
    const { email, password } = this.state

    return (
      <div className="syn-wrapper">
        <div className="syn-form">
          <h2>Login</h2>
          <div className="syn-form__login">
            <label>Email</label>
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              className="syn-form__input"
            />
            <label>password</label>
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              className="syn-form__input"
            />

            <button onClick={this.handleSubmitLogin} className="syn-form__input--btn">Login</button>

            <div>
              <Link href="/manage/signup"><a>Need an account? Signup here</a></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default pageWrapper()(ManageLoginPage)