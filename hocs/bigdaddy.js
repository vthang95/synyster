import { Component } from "react"
import Head from "next/head"
import vi from "antd/lib/locale-provider/en_US"
import { LocaleProvider } from "antd"
import Router from "next/router"
import nprogress from 'nprogress'
import NProgress from 'components/NProgress'

import ManagementLayout from "layouts/manage.layout"
import MainLayout from "layouts/main.layout"
import { getUserFromRequest, isInManagementPage } from "utils/tools"

nprogress.configure({ showSpinner: false, easing: 'ease', speed: 800 });

const bigdaddy = OurChildComponent => {
  class HigherOrderComponent extends Component {
    static async getInitialProps(ctx) {
      let isAuthServer = false, isInAdminPage = false, verifiedUser
      if (isInManagementPage(ctx)) {
        isInAdminPage = true
        let user = getUserFromRequest(ctx.req)
        if (user) {
          isAuthServer = true
          verifiedUser = user
        }
        if (!user && !ctx.isServer) Router.replace("/manage/login")
      }

      const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {}

      return { ...childProps, isAuthServer, isInAdminPage, verifiedUser }
    }

    componentDidMount() {
      const { isAuthServer, verifiedUser } = this.props
      const user = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      if (isAuthServer && (!user || !token)) {
        localStorage.setItem("user", JSON.stringify(verifiedUser))
        localStorage.setItem("token", verifiedUser.token)
      }
    }

    renderChildren = () => {
      if (this.props.isInAdminPage) {
        return (
          <ManagementLayout>
            <OurChildComponent { ...this.props } />
            <NProgress />
          </ManagementLayout>
        )
      }
      return (
        <MainLayout>
          <OurChildComponent { ...this.props } />
          <NProgress />
        </MainLayout>
      )
    }

    getTitle = () => {
      const pageInfo = OurChildComponent.pageInfo
      const postDocument = this.props.postDocument
      if (pageInfo && pageInfo.title) return pageInfo.title
      if (postDocument && postDocument.title) return postDocument.title
      return "vthangit - code your life"
    }

    getMainStyle = () => {
      if (process.env.NODE_ENV === "production") return "build/main_" + __COMMIT_HASH__ + ".css"
      return "dist/main.css"
    }

    render() {
      return (
        <div>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Blog ghi lại chặng đường trở thành một software engineer của tôi" />

            <meta property="og:url" content="http://vthangit.com/" />
            <meta property="og:title" content={this.getTitle()} />
            <meta property="og:description" content="Blog ghi lại chặng đường trở thành một software engineer của tôi" />

            <title>{this.getTitle()}</title>

            <link href="/static/fav.png" type="image/x-icon" sizes="32x32 16x16" rel="icon" />

            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/paraiso-dark.min.css" />
            <link href="/static/dist/highlight.css" rel="stylesheet" />
            <link href={`/static/${this.getMainStyle()}`} rel="stylesheet" />
            <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
          </Head>
          <LocaleProvider locale={vi}>
            {this.renderChildren()}
          </LocaleProvider>
        </div>
      )
    }
  }

  return HigherOrderComponent
}

export default bigdaddy