const md = `
Welcome to [vthang95](https://githun.com/vthang95)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

\`\`\` bash
$ hexo new "My New Post"
\`\`\`

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

\`\`\` bash
$ hexo server
\`\`\`

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

\`\`\` bash
$ hexo generate
\`\`\`

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

\`\`\` bash
$ hexo deploy
\`\`\`

\`\`\` js
var i = 0
function goAway(arg) {
  let a = {}
  a.b = "b"

  return a
}
\`\`\`

\`\`\` ruby
def serve_drinks(%User{age: age}) when age >= 21 do
  # Code that serves drinks!
end

serve_drinks User.get("John Doe")
\`\`\`

More info: [Deployment](https://hexo.io/docs/deployment.html)
`

import React from "react"
import { Button } from "antd"
import marked from "marked"
import hljs from "highlight.js"

import Notification from "components/Notification"
import { authGetInfo } from "actions"
import { pageWrapper } from "utils/wrapper"

// configuration
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // do something in server here!
    const { store } = ctx

    const sendString = "I Got You in Server! Dont believe? You can view page source and find me there!..."
    store.dispatch(authGetInfo(sendString))

    return {isServer: ctx.isServer}
  }

  render() {
    return (
      <div>
        <div className="markdown-content" style={{ maxWidth: 700, margin: "auto" }}>
          <div dangerouslySetInnerHTML={{__html: marked(md)}} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default pageWrapper(mapStateToProps, { authGetInfo })(Index)