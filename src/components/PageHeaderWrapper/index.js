import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { inject, observer } from 'mobx-react'
import GridContent from './GridContent'
import styles from './index.less'
import MenuContext from '@/layouts/MenuContext'

@withRouter
@inject('Setting')
@observer
class PageHeaderWrapper extends React.Component {

  render() {
    const { contentWidth } = this.props.Setting
    const { children, wrapperClassName, top, ...restProps } = this.props
    return (
      <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <MenuContext.Consumer>
          {value => (
            <PageHeader
              wide={contentWidth === 'Fixed'}
              home='首页'
              {...value}
              key="pageheader"
              {...restProps}
              linkElement={Link}
              itemRender={item => {
                return item.name;
              }}
            />
          )}
        </MenuContext.Consumer>
        {children ? (
          <div className={styles.content}>
            <GridContent>{children}</GridContent>
          </div>
        ) : null}
      </div>
    )
  }
}

export default PageHeaderWrapper
