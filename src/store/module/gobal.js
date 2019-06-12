import { observable, action } from 'mobx'



class Gobal {
    // 展开的菜单
    @observable navOpenKeys = sessionStorage.getItem('navOpenKeys') ? JSON.parse(sessionStorage.getItem('navOpenKeys')) : []
    // 用户信息
    @observable userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    // 标签页
    @observable tabsPage = localStorage.getItem('tabsPage') ? JSON.parse(localStorage.getItem('tabsPage')) : [{ "title": "首页", "path": "/" }]

    @action
    addTabsPage = tabPage => {
        if (this.tabsPage.some(v => v.path === tabPage.path)) return
        this.tabsPage.push(tabPage)
        localStorage.setItem('tabsPage', JSON.stringify(this.tabsPage))
    }

    @action
    removeTabsPage = tabPage => {
        return new Promise((resolve) => {
            for (const [i, v] of this.tabsPage.entries()) {
                if (v.path === tabPage.path) {
                    this.tabsPage.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('tabsPage', JSON.stringify(this.tabsPage))
            resolve(this.tabsPage)
        })
    }

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
