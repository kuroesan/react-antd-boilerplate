/* ========================================================

    ** 全局Store **

    直接实例化，在 ../index.js 通过 Provider 渗透。
    在模块内用 @inject('xxx')，将 Store 注入到 props 上。
    哪里用，哪里 @inject('xxx')。

    注意：无论是全局 Store，还是局部 store，必须 @inject('xxx')注入到 props 上才能获取，保证结构的一致性。

   ====================================================== */

import Gobal from './module/gobal'
import Setting from './module/setting'
import ProjectManage from './module/projectManage'

const stores = {
    Gobal,
    Setting,
    ProjectManage
}

export default stores;
