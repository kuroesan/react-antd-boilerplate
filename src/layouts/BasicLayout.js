import React from 'react'
import { Layout, Tag } from 'antd'
import isEqual from 'lodash/isEqual'
import DocumentTitle from 'react-document-title'
import { ContainerQuery } from 'react-container-query'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import SiderMenu from '@/components/SiderMenu'
import pathToRegexp from 'path-to-regexp'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Configure from '@/config/configure'
import Context from './MenuContext'
import Header from './Header'
import cx from 'classname'
import memoizeOne from 'memoize-one'

function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      let locale = 'menu';
      if (parentName && item.name) {
        locale = `${parentName}.${item.name}`;
      } else if (item.name) {
        locale = `menu.${item.name}`;
      } else if (parentName) {
        locale = parentName;
      }
      if (item.path) {
        const result = {
          ...item,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.routes) {
          const children = formatter(item.routes, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      }

      return null;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const { Content } = Layout

@withRouter
@inject('Setting')
@inject('Gobal')
@observer
class BasicLayout extends React.Component {

  constructor(props) {
    super(props)
    this.getPageTitle = memoizeOne(this.getPageTitle)
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.state = {
      rendering: true,
      isMobile: false,
      menuData: this.getMenuData()
    }
  }

  componentDidMount() {

    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;

      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile ? mobile : false,
        });
      }
    });
  }

  componentDidUpdate(preProps) {
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props.Setting;
    if (isMobile && !collapsed) {
      this.props.Setting.changeLayoutCollapsed(false)
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }


  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);
    if (!currRouterData) {
      return Configure.webname;
    }
    return `${currRouterData.name} - ${Configure.webname}`;
  };
  getMenuData() {
    const { routes } = this.props
    return memoizeOneFormatter(routes)
  }
  getContentStyle = () => {
    const { fixedHeader } = this.props.Setting;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };
  getLayoutStyle = () => {
    const { isMobile } = this.state
    const { fixSiderbar, collapsed, layout } = this.props.Setting
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };
  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  // 折叠菜单栏
  handleMenuCollapse = () => {
    this.props.Setting.changeLayoutCollapsed(!this.props.Setting.collapsed)
  }
  removeTab(tabPage) {
    const { removeTabsPage } = this.props.Gobal
    removeTabsPage(tabPage).then((res) => {
      let lastPath = res[res.length - 1].path
      this.props.history.push(lastPath)
    })

  }
  render() {
    const { tabsPage } = this.props.Gobal
    const {
      children,
      location: { pathname }
    } = this.props
    const {
      navTheme,
      contentWidth,
      layout: PropsLayout,
      fixedHeader,
      collapsed
    } = this.props.Setting
    const { isMobile, menuData } = this.state

    const isTop = PropsLayout === 'topmenu'

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={Configure.logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            collapsed={collapsed}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={Configure.logo}
            isMobile={isMobile}
            isTop={isTop}
            theme={navTheme}
            contentWidth={contentWidth}
            layout={PropsLayout}
            fixedHeader={fixedHeader}
            collapsed={collapsed}
            {...this.props}
          />
          <div>
            {
              tabsPage.map((tabPage) => (
                <Tag key={tabPage.path} closable={tabPage.path !== '/'} onClose={() => this.removeTab(tabPage)}>
                  <Link to={tabPage.path}>{tabPage.title}</Link>
                </Tag>
              ))
            }
          </div>
          <Content style={this.getContentStyle()}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
    return (
      <React.Fragment >
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={cx(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment >
    )
  }

}

export default BasicLayout
