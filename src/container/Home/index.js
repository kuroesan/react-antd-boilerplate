/*
 * @Author: ghua 
 * @Date: 2018-10-23 11:20:40 
 * @Last Modified by: ghua
 * @Last Modified time: 2019-03-06 09:57:13
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import cx from 'classname'
// import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import styles from './index.less'

@inject('Gobal')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className={cx("container", styles.flexbox)}>
        home
      </div>
    )
  }
}

export default Home