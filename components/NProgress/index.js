import NProgress from 'nprogress'
import Router from 'next/router'

import stylesheet from './nprogress.css'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done(true)
Router.onRouteChangeError = () => NProgress.done(true)

export default () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>
)
