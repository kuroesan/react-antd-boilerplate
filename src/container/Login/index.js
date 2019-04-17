import React from 'react'
import UserLayout from '@/layouts/UserLayout'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { inject } from 'mobx-react'
import { Form, Input, Icon, Button, message } from 'antd'
import styles from './index.less'

@withRouter
@inject('Gobal')
@Form.create()
class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let param = {
          username: values.username,
          password: values.password
        }
        this.setState({
          loading: true
        })
        if (param.username === 'admin' && param.password === 'admin') {
          this.props.Gobal.changeUserInfo({
            name: 'admin',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          })
          this.props.history.push('/')
        } else {
          message.info('密码错误')
          this.setState({
            loading: false
          })
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <DocumentTitle title="登录">
        <UserLayout>
          <div className={styles.login}>
            <div className={styles.loginTitleWrap}>
              <div className={styles.loginTitle}>账号密码登录</div>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{
                    required: true, message: '请输入用户名'
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名：admin"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码'
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码：admin"
                  />
                )}
              </Form.Item>
              <Button loading={this.state.loading} style={{ marginTop: 32 }} size="large" type="primary" htmlType="submit" block>登录</Button>
            </Form>
          </div>
        </UserLayout>
      </DocumentTitle>
    )
  }

}

export default Login
