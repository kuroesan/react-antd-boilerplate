import React, { Component } from 'react'
import { Spin } from 'antd'

class Loading extends Component {

    render() {
        return <div style={{ textAlign: 'center', padding: '30px 50px', margin: '20px 0' }}><Spin /></div>
    }
}

export default Loading