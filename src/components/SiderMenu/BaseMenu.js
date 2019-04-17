import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import menuConfig from '@/config/routes.config'
import { Link } from 'react-router-dom'

const homePath = '/'
let menuItemsCache = null
const topMenus = menuConfig.map(item => item.path)

@inject('Gobal')
@observer
class BaseMenu extends Component {
  getSelectedKeys = (path) => {
    let keys = []
    if (path === '/') {
      path = homePath
    }
    let paths = path.match(/\/[^/]*/ig)
    paths.forEach((d, i) => {
      keys.push(d)
    })

    return keys
  }
  getMenus = (menuArray, collapsed) => {
    if (!!menuArray && menuArray.length > 0) {
      return menuArray.map(item => {
        let linkTo = item.path
        if (item.hideInMenu) {
          return null
        }
        if (item.routes) {
          return (
            <Menu.SubMenu
              key={linkTo}
              title={<span><Icon type={item.icon} theme="outlined" />{collapsed && topMenus.indexOf(item.path) >= 0 ? '' : item.name}</span>}
            >
              {this.getMenus(item.routes, collapsed)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={linkTo}>
            <Link to={linkTo}>
              {item.icon ? <Icon type={item.icon} theme="outlined" /> : ''}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      });
    }
  }
  handleOpenChange = (openKeys) => {
    this.props.Gobal.changeOpenKeys([openKeys[openKeys.length - 1]])
  }
  componentWillReceiveProps(newProps) {
    if (newProps.isMobile) {
      this.props.Gobal.changeOpenKeys([])
    } else {
      if (newProps.collapsed) {
        this.props.Gobal.changeOpenKeys([])
      }
    }
  }
  render() {
    const { location, mode, theme, collapsed } = this.props
    const { navOpenKeys } = this.props.Gobal
    menuItemsCache = this.getMenus(menuConfig, collapsed, '/')
    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        className={mode === 'horizontal' ? 'top-nav-menu' : ''}
        selectedKeys={this.getSelectedKeys(location.pathname)}
        openKeys={navOpenKeys}
        onOpenChange={this.handleOpenChange}
      >
        {menuItemsCache}
      </Menu>
    );
  }
}

export default BaseMenu