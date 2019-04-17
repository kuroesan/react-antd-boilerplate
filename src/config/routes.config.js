import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Home = Loadable({ loader: () => import('../container/Home'), loading: DelayLoading, delay: 500 })
const ListTemplate = Loadable({ loader: () => import('../container/PageTemplate/listTemplate'), loading: DelayLoading, delay: 500 })
const DetailTemplate = Loadable({ loader: () => import('../container/PageTemplate/detailTemplate'), loading: DelayLoading, delay: 500 })

// 路由配置
const routes = [
	{
		path: '/',
		name: '首页',
		icon: "home",
		component: Home,
		exact: true
	},
	{
		path: '/projectManage',
		name: '项目管理',
		icon: 'project',
		exact: true,
		routes: [
			{
				path: '/projectManage/addProject',
				name: '新建项目',
				component: Home
			},
			{
				path: '/projectManage/projectList',
				name: '项目列表',
				component: Home
			}
		]
	},
	{
		path: '/templateManage',
		name: '模板管理',
		icon: 'profile',
		routes: [
			{
				path: '/templateManage/listTemplate',
				name: '列表模板',
				component: ListTemplate
			},
			{
				path: '/templateManage/detailTemplate',
				name: '详情模板',
				component: DetailTemplate
			}
		]
	},
	{
		path: '/account',
		name: '用户设置',
		component: Home,
		hideInMenu: true,
		exact: true,
	}
]
export default routes