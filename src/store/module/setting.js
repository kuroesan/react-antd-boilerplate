import { observable, action } from 'mobx'
import Configure from '@/config/configure'

class Setting {
  @observable collapsed = localStorage.getItem('collapsed') === 'true'
  // 主题颜色
  @observable navTheme = Configure.navTheme
  // 主色调
  @observable primaryColor = Configure.primaryColor
  // 整体布局
  @observable layout = Configure.layout
  // content布局：流式或者定宽
  @observable contentWidth = Configure.contentWidth
  // 固定头部
  @observable fixedHeader = Configure.fixedHeader
  // 自动隐藏头部
  @observable autoHideHeader = Configure.autoHideHeader
  // 固定侧边栏
  @observable fixSiderbar = Configure.fixSiderbar

  @action
  changeLayoutCollapsed = collapsed => {
    localStorage.setItem('collapsed', collapsed)
    this.collapsed = collapsed
  }

}

export default new Setting()
