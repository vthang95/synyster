import { Component } from "react"
import Head from "next/head"
import vi from "antd/lib/locale-provider/en_US"
import { LocaleProvider } from "antd"

import MainLayout from "layouts/main.layout"

const bigdaddy = OurChildComponent => {
  class HigherOrderComponent extends Component {
    static async getInitialProps(ctx) {
      // Do something in serverside here
      const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {}

      return { ...childProps }
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
            {/*<link href="/static/css/antd.min.css" rel="stylesheet" />*/}
            <link href="/static/dist/highlight.css" rel="stylesheet" />
            <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
            {/*<script>;</script>*/}
          </Head>
          <LocaleProvider locale={vi}>
            <MainLayout>
              <OurChildComponent { ...this.props } />
            </MainLayout>
          </LocaleProvider>
        </div>
      )
    }
  }

  return HigherOrderComponent
}

export default bigdaddy