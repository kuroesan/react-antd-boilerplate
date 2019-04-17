import React, { Component } from 'react'
import styles from './index.less'
import bgimg2 from './bg.jpg'

export default class BackGround extends Component {

  render() {

    const mystyles = {
      bg: {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bgimg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }
    }

    return (
      <div className={styles.bg_wrap}>
        <div id="bg" style={mystyles.bg}></div>
        {/* <canvas className={styles.canvas_wrap} id="canvas"></canvas> */}
      </div>
    )
  }
}