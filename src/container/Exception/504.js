import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import style from './style.less'
import bg from './504.png'

@withRouter
@inject('Gobal')
class timeOut extends Component {
  componentWillMount() {
    const { exceptionFlag, updateExceptionFlag, removeExceptionFlag } = this.props.Gobal
    let params = new URLSearchParams(this.props.location.search);
    let fromUrl = atob(params.get('from'))
    if (exceptionFlag) {
      removeExceptionFlag().then(() => {
        window.location.href = fromUrl
      })
    } else {
      updateExceptionFlag(true)
    }
  }
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
          <p className={style.tips}>抱歉！您访问的页面超时，请刷新重试！</p>
        </div>
      </div>
    )
  }

}

export default timeOut