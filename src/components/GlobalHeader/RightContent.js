import React, { Component } from 'react'
import { Spin, Tag, Menu, Icon, Dropdown, Avatar } from 'antd'
import { inject } from 'mobx-react'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
// import HeaderSearch from '../HeaderSearch'
import styles from './index.less'

@inject('Gobal')
class GlobalHeaderRight extends Component {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  handleLogout = () => {
    this.props.Gobal.loginOut()
  }
  render() {
    const { userInfo } = this.props.Gobal
    const {
      theme,
      layout
    } = this.props;
    const menu = (
      <Menu className={styles.menu} >
        {/* <Menu.Item key="userCenter" onClick={() => this.props.history.push('/account')}>
          <Icon type="user" />
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout" onClick={this.handleLogout}>
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {/* <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder='站内搜索'
          dataSource={[
            '搜索提示一',
            '搜索提示二',
            '搜索提示三'
          ]}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title='帮助'>
          <a
            target="_blank"
            href="/"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip> */}
        {userInfo.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={userInfo.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{userInfo.name}</span>
            </span>
          </Dropdown>
        ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
      </div>
    );
  }
}

export default GlobalHeaderRight
