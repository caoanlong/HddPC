<template>
	<div>
		<div class="content">
		<div class="topic"></div>
			<div class="page-w">
    			<div class="clearfix">
                    <div class="lside">
                        <ul class="sideNav">
                        	<router-link :to="{name: 'AboutUs',query:{cur:1}}" tag="li" :class="{'active':$route.query.cur==1}">我们是谁</router-link>
                        	<router-link :to="{name: 'Chronicle',query:{cur:2}}" tag="li" :class="{'active':$route.query.cur==2}">大事记</router-link>
                        	<router-link :to="{name: 'Organization',query:{cur:3}}" tag="li" :class="{'active':$route.query.cur==3}">组织架构</router-link>
                        	<!-- <router-link :to="{name: 'Team',query:{cur:4}}" tag="li" :class="{'active':$route.query.cur==4}">团队介绍</router-link> -->
                        	<router-link :to="{name: 'Products',query:{cur:4}}" tag="li" :class="{'active':$route.query.cur==4}">产品服务</router-link>
                        	<router-link :to="{name: 'Solve',query:{cur:5}}" tag="li" :class="{'active':$route.query.cur==5}">我们能解决</router-link>
                        	<router-link :to="{name: 'Partners',query:{cur:6}}" tag="li" :class="{'active':$route.query.cur==6}">合作伙伴</router-link>
                        	<router-link :to="{name: 'ContactUs',query:{cur:7}}" tag="li" :class="{'active':$route.query.cur==7}">联系我们</router-link>
                        </ul>
                        
                    </div>
                    <div class="rside">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		created() {
			this.$store.commit({type:'selectChange',selected:5});
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.topic
		width 100%
		height 222px
		background url('../../../static/img/topic.jpg') no-repeat top center
		margin-bottom 10px
	.lside
		width 240px
		float left
		.sideNav
			background #fff
			border-radius 4px
			padding  10px 20px
			li
				line-height 40px
				cursor pointer
				position relative
				padding-left 10px
				font-size 14px
				&.active
					color #6cc
					&:before
						content ''
						width 4px
						height 12px
						background #6cc
						display block
						position absolute
						left 0
						top 14px
				&:hover
					color #6cc
	.rside
		width 1030px
		float right
		background #fff
		border-radius 4px
</style>