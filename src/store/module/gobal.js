import { observable, action } from 'mobx'

class Gobal {
    // 展开的菜单
    @observable navOpenKeys = sessionStorage.getItem('navOpenKeys') ? JSON.parse(sessionStorage.getItem('navOpenKeys')) : []
    // 用户信息
    @observable userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    @action
    changeUserInfo = userInfo => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.userInfo = userInfo
    }
    @action
    loginOut = () => {
        localStorage.removeItem('userInfo')
        this.userInfo = null
    }

    @action
    changeOpenKeys = navOpenKeys => {
        sessionStorage.setItem('navOpenKeys', JSON.stringify(navOpenKeys))
        this.navOpenKeys = navOpenKeys
    }
    @action
    handleSwitchSider = siderFold => {
        localStorage.setItem('huobiAdminsideFold', !siderFold)
        this.siderFold = !siderFold

    }
}

export default new Gobal();
