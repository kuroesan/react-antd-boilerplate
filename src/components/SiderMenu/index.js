import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

class SiderMenuWrapper extends React.Component {
  render() {
    const { isMobile, menuData, onCollapse, theme, collapsed } = this.props;
    return isMobile ? (
      <Drawer
        className="sider-drawer"
        visible={!collapsed}
        placement="left"
        onClose={() => onCollapse(true)}
        style={{
          padding: 0,
          height: '100vh',
        }}
      >
        <SiderMenu
          {...this.props}
          theme={theme}
          flatMenuKeys={getFlatMenuKeys(menuData)}
          isMobile={isMobile}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    ) : (
        <SiderMenu
          {...this.props}
          theme={theme}
          isMobile={isMobile}
          collapsed={collapsed}
          flatMenuKeys={getFlatMenuKeys(menuData)}
        />
      );
  }
};

export default SiderMenuWrapper;
