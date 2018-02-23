import { Component } from "react"
import Head from "next/head"
import vi from "antd/lib/locale-provider/en_US"
import { LocaleProvider } from "antd"
import Router from "next/router"

import ManagementLayout from "layouts/manage.layout"
import MainLayout from "layouts/main.layout"
import { getUserFromRequest, isInManagementPage } from "utils/tools"

const bigdaddy = OurChildComponent => {
  class HigherOrderComponent extends Component {
    static async getInitialProps(ctx) {
      let isAuthServer = false, isInAdminPage = false
      if (isInManagementPage(ctx)) {
        isInAdminPage = true
        let user = getUserFromRequest(ctx.req)
        if (user) isAuthServer = true
        // TODO: check: if isAuthServer but lost info in localStorage -> rewrite
        if (!user && !ctx.isServer) Router.replace("/manage/login")
      }

      const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {}


      return { ...childProps, isAuthServer, isInAdminPage }
    }

    renderChildren = () => {
      if (this.props.isInAdminPage) {
        return (
          <ManagementLayout>
            <OurChildComponent { ...this.props } />
          </ManagementLayout>
        )
      }
      return (
        <MainLayout>
          <OurChildComponent { ...this.props } />
        </MainLayout>
      )
    }

    render() {
      return (
        <div>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Simple Nextjs Boilerplate!</title>
            <meta name="description" content="A boilerplate for server side rendering with react and nextjs" />

            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/paraiso-dark.min.css" />
            <link href="/static/dist/highlight.css" rel="stylesheet" />
            <link href="/static/dist/main.css" rel="stylesheet" />
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