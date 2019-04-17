import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class RouteWithSubRoutes extends Component {
  render() {
    const route = this.props
    return (
      <Route
        exact={route.exact ? true : false}
        path={route.path}
        render={props => {
          return (
            <route.component title={route.title} {...props} />
          )
        }}
      />
    )
  }
}

export default RouteWithSubRoutes
