import React, { Component } from 'react'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { inject, observer } from 'mobx-react'

import RouteWithSubRoutes from '@/utils/routeWithSubRoutes'
import MainApp from './main'
import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

moment.locale('zh-cn')


const LoginScreen = Loadable({ loader: () => import('../container/Login'), loading: DelayLoading, delay: 500 })
const NotFound = Loadable({ loader: () => import('../container/Exception/404'), loading: DelayLoading, delay: 500 })
const ServiceError = Loadable({ loader: () => import('../container/Exception/500'), loading: DelayLoading, delay: 500 })
const ServiceTimeOut = Loadable({ loader: () => import('../container/Exception/504'), loading: DelayLoading, delay: 500 })


@withRouter
@inject('Gobal')
@inject('Setting')
@observer
class App extends Component {

  renderRoute() {
    const { currLocale } = this.props.Setting
    let result = []
    if (this.props.Gobal.userInfo) {
      result.push(
        <LocaleProvider locale={currLocale === 'en' ? en_US : zh_CN}>
          <Switch>
            <Route path="/exception/404" component={NotFound} exact />
            <Route path="/exception/500" component={ServiceError} exact />
            <Route path="/exception/504" component={ServiceTimeOut} exact />
            <RouteWithSubRoutes path="/" component={MainApp} exact={false} />
          </Switch>
        </LocaleProvider>
      )
    } else {
      result.push(
        <LocaleProvider locale={currLocale === 'en' ? en_US : zh_CN}>
          <Switch >
            <Route exact path="/login" component={LoginScreen} />
            <Redirect exact={true} from="/*" to="/login" />
          </Switch>
        </LocaleProvider>
      )
    }
    return result
  }
  render() {
    return this.renderRoute()
  }
}

export default hot(module)(App)
