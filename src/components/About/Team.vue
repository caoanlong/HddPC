<template>
		<div class="con">
			<div class="item item1">
				<p class="name"><b>吴郑平</b>
				<p class="post">公司技术总监</p>
				<p class="des">曾任职华为技术有限公司、中软网络技术股份有限公司项目总监，多年尖端研发团队管理经验，致力于物流信息化与实体物流业务结合实践工作。</p>
			</div>
			<div class="item">
				<p class="name"><b>罗凯</b>资深产品经理</p>
				<p class="des">曾任职华为、中兴通讯等知名企业，多年产品设计、需求分析、项目研发管理从业经验。</p>
			</div>
			<div class="item item2">
				<p class="name"><b>石艳娇</b>项目经理</p>
				<p class="des">曾就职于中软科技服务有限公司，参与华为多个大中型项目，先后担任测试分析师、解决方案BA、项目经理等多个岗位，多年项目团队管理经验。</p>
			</div>
			<div class="item">
				<p class="name"><b>邹文臣</b>系统架构师</p>
				<p class="des">曾任职爱立信（中国）通信限公司，团贷网深圳分公司(你我金融)，从事软件行业多年积累丰富的研发、架构设计及其团队管理的工作经验。</p>
			</div>
			<div class="list">
				<div class="item">
					<p class="name"><b>贾坤</b>产品经理</p>
					<p class="des">创维数字技术有限公司产品经理，快金数据技术服务有限公司产品负责人，专注于物流行业信息化整合与新趋势下干线物流的平台化运作。</p>
				</div>
				<div class="item">
					<p class="name"><b>万鸿</b>财务总监</p>
					<p class="des">资深会计师，18年物流行业的财务管理工作、对税收法规、企业内控管理、成本管理、融资筹资从业经验。</p>
				</div>
				<div class="item">
					<p class="name"><b>陈昊</b>营销总监</p>
					<p class="des">曾任圆通快递（云南）副总经理、云南大益集团物流总监、巨丰储运有限公司总经理，负责众多重点项目物流、贸易物流方案规划及实施，主管物流项目运输总量超千万吨，运费总额数亿元。</p>
				</div>
				<div class="item">
					<p class="name"><b>张迅</b>实施总监</p>
					<p class="des">曾任金蝶软件、四川华丰企业集团、德凯宝马等公司任项目经理、集团信息经理，负责公司信息话项目规划及运作，多年信息化项目实施、运维经验。</p>
				</div>
				<div class="item">
					<p class="name"><b>柏珺</b>项目总监</p>
					<p class="des">云南智慧交通物流公共信息服务平台、云南物流电子交易中心、中国移动（云南）彩云优品核心项目成员、业务负责人，多年信息化项目规划、实施及管理经验，专注物流信息化项目运作。</p>
				</div>
			</div>
		</div>
</template>
<script>
	import TeamItem from './TeamItem'
	export default {
		components: {
			TeamItem
		}
	}
</script>
<style lang="stylus" scoped>
	.con
		background url('../../../static/img/team.jpg') top left no-repeat
		padding 140px 40px 40px 520px
		position relative
		.list
			margin-left -460px
		.item
			background #3480b1
			color #fff
			padding 20px
			positon relative
			border 10px solid #fff
			.name
				position relative
				display block
				padding-left 20px
				font-size 16px
				height 40px
				line-height 40px
				&:before
					content ''
					width 5px
					height 24px
					display block
					background #fff
					border-radius 2px
					position absolute
					left 0
					top 10px
			b
				font-size 24px
				margin-right 10px
			&.item1
				position absolute
				left 60px
				top 350px
				width 460px
				padding 40px
				.name
					padding 0
					b
						font-size 34px
					&:before
						display none
						
				.post
					font-size 18px
					line-height 40px
				.des
					font-size 16px
			&.item2
				background #74bc43
			.des
				line-height 30px
</style>