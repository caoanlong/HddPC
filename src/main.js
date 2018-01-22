// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import base from './common/base'
import './common/filters'
import BaiduMap from 'vue-baidu-map'
import rs from 'jsrsasign'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import msg from './components/commonComponents/msg'
import modal from './components/commonComponents/modal'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(base)
Vue.use(msg)
Vue.use(modal)
Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
// Vue.http.options.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
Vue.http.interceptors.push((request, next) => {
	//请求发送前的处理逻辑
	const authorization = localStorage.getItem('authorization') || ''
	if (authorization) {
		request.headers.set('Authorization', authorization)
	}
	next()
})


Vue.use(BaiduMap, {
	// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
	ak: 'AjsVKu7N9iBX2klb9ktqGfAvA5dkfRBs'
})


/* eslint-disable no-new */
var Root = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
document.addEventListener('DOMContentLoaded',function() {
	Root.$mount('#app')
})
