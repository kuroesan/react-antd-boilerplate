import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Debounce from 'lodash-decorators/debounce';
import cx from 'classname';
import styles from './index.less';
import RightContent from './RightContent';
import Configure from '@/config/configure'

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();

  };
  render() {
    const { collapsed, isMobile, theme } = this.props;

    return (
      <div className={cx(styles.header, theme === 'dark' && styles.dark)}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={Configure.logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent {...this.props} />
      </div>
    );
  }
}
