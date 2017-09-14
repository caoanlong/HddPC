<template>
	<div class="header">
        <div class="page-w">
            <router-link :to="{name:'Home'}" class="logo fl"><img src="../../../static/img/logo.png" /></router-link>
            <div class="areaSelect"></div>
            <ul class="nav fl">
                <li class="firstLi">
                	<router-link :to="{name:'Home'}" title="首页">首页</router-link>
                </li>
                <li class="firstLi haveChild" @mouseover="showSubMenu(true)" @mouseout="showSubMenu(false)">
                	<router-link :to="{name:'FindTruck'}" title="车源" :class="{'selected':selected == 2}">车源</router-link>
                </li>
                <li class="firstLi">
                	<router-link :to="{name:'FindGoods'}" title="货源" :class="{'selected':selected == 3}">货源</router-link>
                </li>
                <!-- <li class="firstLi">
                	<router-link :to="{name:'SpecialLine'}" title="专线" :class="{'selected':selected == 4}">专线</router-link>
                </li> -->
                <li class="firstLi">
                	<router-link :to="{name:'AboutUs',query:{cur:1}}" title="关于我们" :class="{'selected':selected == 5}">关于我们</router-link>
                </li>
            </ul>
            <div class="fr">
                <div class="userInfo fl">
                    <span v-if="!memberInfo">
                    	<router-link :to="{name:'Login'}" title="登录/注册">登录/注册</router-link>
                    </span>
                    <span v-else-if="memberInfo">
                    	<router-link :to="authGoTo" v-text="'您好，'+(memberInfo.realName||memberInfo.mobile)"></router-link>
                    	<a href="javascript:void(0)" title="退出" @click.stop="signout()">退出</a>
                    </span>
                </div>
                <!-- <span>
                	<router-link to="" title="企业端供应链" class="fr link">企业端供应链</router-link>
                </span> -->
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				isSubMenuShow: false
			}
		},
		computed: {
			selected() {
				return this.$store.state.selected
			},
			authGoTo() {
				if (this.memberInfo.certifyStatus == 'Y') {
					return {name:'UserInfo',query:{active:31}}
				}else {
					return {name:'CompleteInfo',query:{active:32}}
				}
			},
			memberInfo() {
				return this.$store.state.memberInfo;
			}
		},
		methods: {
			showSubMenu(isShow) {
				if (isShow) {
					this.isSubMenuShow = true
				}else {
					this.isSubMenuShow = false
				}
			},
			signout() {
				let URL = this.__webserver__ + 'signout';
				this.$http.post(URL).then(
					(res) => {
						if (res.body.code == 200) {
							this.$store.commit('loginout',null);
							this.showMsg({msg: '退出成功',delay: 1000});
							this.$router.push({name: 'Login'});
						}else {
							this.showMsg({msg: res.body.message,delay: 1000});
						}
					},
					(res) => {
						this.showMsg({msg: '失败',delay: 1000});
						console.log(JSON.stringify(res.body));
					}
				)
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.header
		height 65px
		background #fff
		.logo
			display block
			padding 15px 0
		.nav
			height 65px
			margin-left 50px
			.firstLi
				float left
				height 65px
				padding 0px 20px
				a
					display block
					padding 0 10px
					font-size 16px
					line-height 65px
					height 65px
					color #878787
					&:hover
						color #6cc
					&.selected
						color #6cc
				.logout
					font-size 16px
					line-height 32px
					height 32px
					color #878787
					border-bottom 2px solid #fff
			.haveChild
				position relative
				.tip-menu
					position absolute
					left 0px
					top 65px
					width 92px
					background-color #4a4f5f
					z-index 999
					a
						display block
						width 100%
						height 50px
						line-height 50px
						text-align center
						padding 0
						border 0
						&.selected
							color #6cc
					&:before
						content ''
						display block
						position absolute
						top -5px
						left 42px
						width 10px
						height 10px
						background-color #4a4f5f
						transform rotate(45deg)
		.userInfo
			margin-top 20px
			padding-left 24px
			background url('../../../static/img/user.png') no-repeat left center
			a
				font-size 16px
				padding 0 10px
				color #878787
				&.login
					padding-right 11px
					background url('../../../static/img/line.png') right center no-repeat
				&:hover
					color #6cc
		.link
			font-size 16px
			margin 20px 0 0 50px
			color #878787
			&:hover
				color #6cc
</style>