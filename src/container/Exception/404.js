import React, { Component } from 'react'
import style from './style.less'
import bg from './404.png'
import { Link } from 'react-router-dom'

class NotFound extends Component {
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
          <p className={style.tips}>抱歉！您访问的页面不存在，点此 <Link className={style.back} to={`/`}>返回首页</Link></p>
        </div>
      </div>
    )
  }

}

export default NotFound