import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'
import RouteWithSubRoutes from '@/utils/routeWithSubRoutes'
import routes from '@/config/routes.config'
import BasicLayout from '@/layouts/BasicLayout'

let resultRoutes = []

@withRouter
@inject('Gobal')
@observer
class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoutes: [],
    }
  }
  componentWillMount() {
    resultRoutes = []
    this.initRoutesData(routes)
    this.setState({
      newRoutes: resultRoutes
    })
  }
  getSelectedKeys = (path) => {
    let keys = []
    let paths = path.match(/\/[^/]*/ig)
    paths.forEach((d, i) => {
      i === 0 ? keys.push(d) : keys.push(keys[i - 1] + d)
    })
    return keys
  }
  initRoutesData(routes) {
    return routes.map((route) => {
      if (route.component) {
        resultRoutes.push({
          path: route.path,
          title: route.name,
          component: route.component,
          exact: route.exact ? route.exact : false
        })
      }
      if (Boolean(route.routes) && route.routes.length > 0) {
        this.initRoutesData(route.routes)
      }
      return route
    })
  }
  componentWillReceiveProps(nextProps) {
    // 监听路由发生改变的时候
    if (!_.eq(this.props.location.pathname, nextProps.location.pathname)) {
      this.addTab(nextProps.location.pathname)
    }
  }
  addTab(path) {
    const { addTabsPage } = this.props.Gobal
    let currentRoute = {}
    this.state.newRoutes.map((route) => {
      if (_.eq(route.path, path)) {
        currentRoute.title = route.title
        currentRoute.path = route.path
      }
      return route
    })
    addTabsPage(currentRoute)
  }
  render() {

    return (
      <BasicLayout
        routes={routes}
      >
        <Switch>
          {this.state.newRoutes.map((route, i) => <RouteWithSubRoutes key={route.path} {...route} />)}
          <Redirect
            to={{
              pathname: "/exception/404",
              state: { from: this.props.location }
            }}
          />
        </Switch>
      </BasicLayout>
    )
  }
}

export default MainApp
