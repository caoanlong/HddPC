<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" :style="{'width':width+'px','height':height+'px'}" v-for="(file,i) in fileUrl">
			<img :src="file">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="isShowImgModal = true"></div>
					<div class="delBtn" @click.stop="delImg(i)"></div>
				</div>
			</div>
			<CustomModal title="查看图片" :width="500" :height="400" v-if="isShowImgModal" @closeModal="closeImgModal">
				<img :src="file">
			</CustomModal>
		</div>
		<div class="addBtn" :style="{'width':width+'px','height':height+'px'}" v-show="isLimit">
			<div class="addIcon">
				<div class="ico"></div>
				<p>添加</p>
			</div>
			<input type="file" name="" @change.stop="addImg()" ref="uploadFile"/>
		</div>
	</div>
</template>
<script>
	import CustomModal from './CustomModal'
	import common from '../../common/common.js'
	export default {
		props: {
			width: {
				type: Number,
				default: 100
			},
			height: {
				type: Number,
				default: 100
			},
			limitNum: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				fileUrl: [],
				isShowImgModal: false
			}
		},
		computed: {
			isLimit() {
				if (this.fileUrl.length>this.limitNum-1) {
					return false
				}else {
					return true
				}
			}
		},
		methods: {
			addImg() {
				var url = this.__imgserver__ + 'sys/picture/upload';
				var headers = {'Content-type':'multipart/form-data;charset=UTF-8'};
				var params = common.formDataReq({
					"file": this.$refs.uploadFile.files[0],
				});
				this.$http.post(url,params,headers).then(
					(res) => {
						this.fileUrl.push(this.__imgserver__+res.body.data);
						this.$emit('imgUrlBack',this.fileUrl);
						console.log(res.body);
					},
					(res) => {
						console.log(JSON.stringify(res.body));
					}
				).catch(() => {
					console.log('服务器异常');
				})
			},
			delImg(i) {
				this.fileUrl.splice(i,1);
				this.$emit('imgUrlBack',this.fileUrl);
			},
			closeImgModal() {
				this.isShowImgModal = false;
			}
		},
		components: {
			CustomModal
		}
	}
</script>
<style lang="stylus" scoped>
	.imgUpload
		.imgLi
			float left
			border 1px solid #f0f0f0
			border-radius 6px
			text-align center
			position relative
			margin 0 5px 5px 0
			.controller
				position absolute
				top 0
				left 0
				width 100%
				height 100%
				border-radius 6px
				background-color rgba(0, 0, 0, .5)
				display none
				.controllerBtn
					position absolute
					left 0
					top 0
					right 0
					bottom 0
					margin auto
					width 80px
					height 40px
					cursor pointer
					.perviewBtn
						float left
						width 40px
						height 40px
						background-image url('../../assets/img/perview.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
					.delBtn
						float left
						width 40px
						height 40px
						background-image url('../../assets/img/trush.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
			img
				display block
				width 100%
				height 100%
				border-radius 6px
			&:hover
				.controller
					display block
		.addBtn
			float left
			border 1px dashed #d9d9d9
			border-radius 6px
			color #6cc
			position relative
			text-align center
			margin 0 5px 5px 0
			&:hover
				border-color #6cc
			.addIcon
				position absolute
				left 0
				top 0
				right 0
				bottom 0
				margin auto
				width 100%
				height 52px
				.ico
					width 26px
					height 26px
					margin 0 auto
					background-image url('../../assets/img/add-img.png')
					background-repeat no-repeat
					background-size 100%
				p
					line-height 26px
			input
				display block
				width 100%
				height 100%
				opacity 0
</style>