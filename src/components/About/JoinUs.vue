<template>
	<div>
		<div class="tit">招贤纳士</div>
		<div class="con clearfix">	
			<div class="inline clearfix">
				<span class="labels">地区：</span>
	        	<Multiselect v-model="selectedArea" :options="area" label="label" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择地区"></Multiselect>
				<span class="labels">岗位：</span>
	        	<Multiselect v-model="selectedQuarters" :options="quarters" label="label" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择岗位"></Multiselect>
			</div>
			<div class="jobDetailItem fl">
				<p class="title">任职要求：</p>
				<p>1.Java开发经验3-5年及以上，理解面向对象思想</p>
				<p>2.具有良好的编码习惯，编写高质量的代码，良好的文档编写能力</p>
				<p>3. 熟悉分布式系统架构思想，熟练使用Web Service，Socket编程技术</p>
				<p>4. 良好的算法设计能力</p>
				<p>5. 具有一定的Linux使用经验，能编写简单的Shell脚本</p>
				<p>6.精通Spring，Struts(2)，Hibernate等框架</p>
				<p class="title">加分项：</p>
				<p>有使用Agile流程开发经验者优先考虑</p>
				<p>有Lucene, MySQL经验者优先考虑熟练</p>
				<p>掌握SQL语言，并有相当的数据库项目开发经验（包括SQL优化和存储过程开发等）</p>
				<p>对技术有热情，敢于挑战权威，对待任何事物秉持刨根问底的态度。</p>
				<p class="title">福利：</p>
				<p>1. 复杂业务场景的直接挑战。</p>
				<p>2. 开放分享的技术氛围。</p>
			</div>
			<div class="hr fr">
				<div class="title f14 fb">申请职位</div>
				<p class="c1 fb f14">投递简历</p>
				<p>zjj@vfu56.com</p>
				<p class="c1 fb f14">咨询电话</p>
				<p>0755-26607376</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Multiselect from 'vue-multiselect'
	export default {
		data() {
			return {
				area:[
                    {
						value: 1,
						label: '云南地区'
					},
					{
						value: 2,
						label: '深圳地区'
					},
                ],
                quarters:[
                    {
						value: 1,
						label: 'JAVA开发工程师'
					},
                ],
				selectedArea:null,
				selectedQuarters:null,
			}
		},
		components: {
			Multiselect
		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		color #878787
		font-weight bold
		height 40px
		padding 0 20px
		border-bottom 1px solid #f0f0f0
		font-size 14px
		line-height 40px
		
	.con
		padding 10px 20px 100px
		.inline
			.labels
				display inline-block
				float left
				line-height 40px
				padding 0 10px
			.multiselect
				display inline-block
				float left
				width 150px
		.jobDetailItem
			padding 20px 0
			width 750px
			line-height 30px
			.title
				color #6cc
				font-size 16px
				padding 10px 0
		.hr
			width 220px
			padding-bottom 10px
			margin-top 20px
			background #f6f6f6
			.title
				background #6cc
				color #fff
				padding 0 10px
				height 40px
				line-height 40px
				line-height 40px
				margin-bottom 10px
			p
				padding 0 20px
				line-height 30px
</style>