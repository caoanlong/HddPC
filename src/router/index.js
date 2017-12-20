import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import common from '../common/common.js'

Vue.use(Router);

const router = new Router({
	// mode: 'history',
	routes: [
		{ 
			path: '*',
			redirect: {name: 'Home'}
		},
		{
			path: '/',
			name: 'Home',
			component: resolve => require(['@/components/Home'], resolve)
		},
		{
			path: '/Login',
			name: 'Login',
			component: resolve => require(['@/components/Login'], resolve),
			meta: {
				loginout: true
			}
		},
		{
			path: '/UserCenter',
			name: 'UserCenter',
			component: resolve => require(['@/components/UserCenter/UserCenter'], resolve),
			redirect: {name: 'CompleteInfo'},
			children: [
				{
					path: '/UserCenter/OwnTruck',
					name: 'OwnTruck',
					component: resolve => require(['@/components/UserCenter/OwnTruck'], resolve),
				},
				{
					path: '/UserCenter/FamiliarTruck',
					name: 'FamiliarTruck',
					component: resolve => require(['@/components/UserCenter/FamiliarTruck'], resolve),
				},
				{
					path: '/UserCenter/AffiliatedTruck',
					name: 'AffiliatedTruck',
					component: resolve => require(['@/components/UserCenter/AffiliatedTruck'], resolve),
				},
				{
					path: '/UserCenter/UserInfo',
					name: 'UserInfo',
					component: resolve => require(['@/components/UserCenter/UserInfo'], resolve)
				},
				{
					path: '/UserCenter/CompleteInfo',
					name: 'CompleteInfo',
					component: resolve => require(['@/components/UserCenter/CompleteInfo'], resolve)
				},
				{
					path: '/UserCenter/PublishInfo',
					name: 'PublishInfo',
					component: resolve => require(['@/components/UserCenter/PublishInfo'], resolve)
				},
				{
					path: '/UserCenter/OftenPublish',
					name: 'OftenPublish',
					component: resolve => require(['@/components/UserCenter/OftenPublish'], resolve)
				},
			]
		},
		{
			path: '/FindGoods',
			name: 'FindGoods',
			component: resolve => require(['@/components/FindGoods/FindGoods'], resolve),
			redirect: {name: 'GoodsSearch'},
			children: [
				{
					path: '/FindGoods/GoodsSearch',
					name: 'GoodsSearch',
					component: resolve => require(['@/components/FindGoods/GoodsSearch'], resolve)
				},
				{
					path: '/FindGoods/GoodsDetail',
					name: 'GoodsDetail',
					component: resolve => require(['@/components/FindGoods/GoodsDetail'], resolve)
				},
			]
		},
		{
			path: '/FindTruck',
			name: 'FindTruck',
			component: resolve => require(['@/components/FindTruck/FindTruck'], resolve),
			redirect: {name: 'TruckSearch'},
			children: [
				{
					path: '/FindTruck/TruckSearch',
					name: 'TruckSearch',
					component: resolve => require(['@/components/FindTruck/TruckSearch'], resolve)
				},
				{
					path: '/FindTruck/TruckDetail',
					name: 'TruckDetail',
					component: resolve => require(['@/components/FindTruck/TruckDetail'], resolve)
				},
				{
					path: '/FindTruck/SendGoods',
					name: 'SendGoods',
					component: resolve => require(['@/components/FindTruck/SendGoods'], resolve)
				},
			]
		},
		{
			path: '/SpecialLine',
			name: 'SpecialLine',
			component: resolve => require(['@/components/SpecialLine'], resolve)
		},
		{
			path: '/About',
			name: 'About',
			component: resolve => require(['@/components/About/About'], resolve),
			redirect: {name: 'AboutUs'},
			children: [
				{
					path: '/About/AboutUs',
					name: 'AboutUs',
					component: resolve => require(['@/components/About/AboutUs'], resolve),
				},
				{
					path: '/About/NewsList',
					name: 'NewsList',
					component: resolve => require(['@/components/About/NewsList'], resolve),
				},
				{
					path: '/About/NewsDetail',
					name: 'NewsDetail',
					component: resolve => require(['@/components/About/NewsDetail'], resolve),
				},
				{
					path: '/About/Team',
					name: 'Team',
					component: resolve => require(['@/components/About/Team'], resolve),
				},
				{
					path: '/About/JoinUs',
					name: 'JoinUs',
					component: resolve => require(['@/components/About/JoinUs'], resolve),
				},
				{
					path: '/About/ContactUs',
					name: 'ContactUs',
					component: resolve => require(['@/components/About/ContactUs'], resolve),
				},
			]
		},
	]
});
//刷新页面重新从缓存中获取会员信息
if (localStorage.getItem('memberInfo')) {
		store.commit('login',localStorage.getItem('memberInfo'));
};

router.beforeEach((to, from, next) => {
	if (to.meta.loginout) {
		if (store.state.memberInfo) {
			next({name: 'Home'});
		}else {
			next();
		}
	}else {
		next()
	}
});
export default router;
