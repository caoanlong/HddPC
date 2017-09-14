import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
//配置vuex
const vuexStore = new Vuex.Store({
	state: {
		memberInfo: null,
		selected: 0,
		MsgContent: '',
		isMsgShow: false,
		cargoTypeList: []
	},
	mutations: {
		login: (state,data) => {
			localStorage.setItem('memberInfo',data);
			state.memberInfo = JSON.parse(data);
		},
		loginout: (state) => {
			localStorage.removeItem('memberInfo');
			state.memberInfo = null;
		},
		selectChange: (state,data) => {
			state.selected = data.selected;
		},
		msgContentShow: (state,data) => {
			state.isMsgShow = data.isMsgShow;
			state.MsgContent = data.MsgContent;
		},
		getCargoTypeList: (state,data) => {
			state.cargoTypeList = data.cargoTypeList;
		}
	},
	actions: {
		saveMemberInfo({commit}) {
			commit('saveMemberInfo');
		}
	}
});

export default vuexStore