import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import style from './style.less'
import bg from './500.png'

@withRouter
@inject('Gobal')
class serverError extends Component {
  render() {
    const styles = {
      bgImg: {
        width: '700px',
        height: '450px',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }
    }
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.img} style={styles.bgImg}></div>
          <p className={style.tips}>抱歉！服务器开小差了，请刷新重试！</p>
        </div>
      </div>
    )
  }

}

export default serverError