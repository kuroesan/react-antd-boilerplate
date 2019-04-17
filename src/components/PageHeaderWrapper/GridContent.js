import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import styles from './GridContent.less';

@inject('Setting')
@observer
class GridContent extends Component {
  render() {
    const { children } = this.props
    const { contentWidth } = this.props.Setting
    let className = `${styles.main}`
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`
    }
    return <div className={className}>{children}</div>
  }
}

export default GridContent
