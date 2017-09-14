<template>
	<div>			
		<div class="tit">完善信息</div>
		<div class="con">
			<div class="title">基本信息</div>
			<div class="info-con">
			    <div class="form-item">
		        	<span class="labels"><b>*</b>本人正面照片</span>
		        	<ImageUpload :width="100" :height="100" @imgUrlBack="getHeaderImg"></ImageUpload>
		        	<p v-if="$v.headerImg.$dirty">
		        		<span class="tips" v-show="!$v.headerImg.required">头像不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item" :class="{'error':$v.name.$error}">
		        	<span class="labels"><b>*</b>真实姓名</span>
		        	<input type="text" class="text-input" placeholder="请输入真实姓名" v-model.trim="name" @input="$v.name.$touch()"/>
		        	<p v-if="$v.name.$dirty">
		        		<span class="tips" v-if="!$v.name.required">姓名不能为空</span>
		        		<span class="tips" v-if="!$v.name.maxLength">姓名太长</span>
		        	</p>
		        </div>
		        <div class="form-item" :class="{'error':$v.idCard.$error}">
		        	<span class="labels"><b>*</b>身份证号</span>
		        	<input type="text" class="text-input" placeholder="请输入身份证号" v-model.trim="idCard" @input="$v.idCard.$touch()"/>
		        	<p v-if="$v.idCard.$dirty">
		        		<span class="tips" v-if="!$v.idCard.required">身份证不能为空</span>
		        		<span class="tips" v-if="!$v.idCard.maxLength">身份证号码太长</span>
		        	</p>
		        </div>
		        <div class="form-item">
		        	<span class="labels"><b>*</b>身份证正面</span>
		        	<ImageUpload :width="150" :height="100" @imgUrlBack="getIdCardImg"></ImageUpload>
		        	<p v-if="$v.idCardImg.$dirty">
		        		<span class="tips" v-if="!$v.idCardImg.required">身份证正面不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item">
		        	<span class="labels"><b>*</b>请选择注册角色</span>
		        	<Multiselect v-model="selectedRole" :options="userSort" label="label" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择注册角色"></Multiselect>
		        </div>
	        </div>
	        <div class="title">企业信息</div>
	        <div class="info-con">
	        <div class="form-item" :class="{'error':$v.companyName.$error}" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>公司名称</span>
	        	<input type="text" class="text-input" placeholder="请输入公司名称" v-model.trim="companyName" @input="$v.companyName.$touch()"/>
	        	<p v-if="$v.companyName.$dirty">
	        		<span class="tips" v-if="!$v.companyName.required">公司名称不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.areaValid.$error}" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>所在区域</span>
	        	<div class="text-input AreaSelect" @click.stop="selectArea($event)">
		        	<span class="selectTips" v-if="areaValid">
						<span v-text="area.province.value"></span>
						<span v-text="area.city.value"></span>
						<span v-text="area.dist.value"></span>
					</span>
		        </div>
		        <AreaSelector :option="selectAreaOption" @selectArea="getArea"></AreaSelector>
	        	<p v-if="$v.areaValid.$dirty">
	        		<span class="tips" v-if="!$v.areaValid.required">所在区域不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>地址定位</span>
	        	<div v-text="location" class="locationPosition" placeholder="请输入定位地址" @click="showMapModel"></div>
	        	<p v-if="$v.location.$dirty">
	        		<span class="tips" v-if="!$v.location.required">定位地址不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.adress.$error}" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>详细地址</span>
	        	<input type="text" class="text-input" placeholder="街道、门牌号" v-model.trim="adress" @input="$v.adress.$touch()"/>
	        	<p v-if="$v.adress.$dirty">
	        		<span class="tips" v-if="!$v.adress.required">详细地址不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.creditCode.$error}" v-show="selectedRole.value==3">
	        	<span class="labels"><b>*</b>统一社会信用代码</span>
	        	<input type="text" class="text-input" placeholder="请输入统一社会信用代码" v-model.trim="creditCode" @input="$v.creditCode.$touch()"/>
	        	<p v-if="$v.creditCode.$dirty">
	        		<span class="tips" v-if="!$v.creditCode.required">统一社会信用代码不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.noCarCarrierCode.$error}" v-show="selectedRole.value==3">
	        	<span class="labels"><b>*</b>无车承运人Code</span>
	        	<input type="text" class="text-input" placeholder="请输入无车承运人Code" v-model.trim="noCarCarrierCode" @input="$v.noCarCarrierCode.$touch()"/>
	        	<p v-if="$v.noCarCarrierCode.$dirty">
	        		<span class="tips" v-if="!$v.noCarCarrierCode.required">无车承运人Code不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.noCarCarrierAppKey.$error}" v-show="selectedRole.value==3">
	        	<span class="labels"><b>*</b>无车承运人appKey</span>
	        	<input type="text" class="text-input" placeholder="请输入无车承运人appKey" v-model.trim="noCarCarrierAppKey" @input="$v.noCarCarrierAppKey.$touch()"/>
	        	<p v-if="$v.noCarCarrierAppKey.$dirty">
	        		<span class="tips" v-if="!$v.noCarCarrierAppKey.required">无车承运人appKey不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" :class="{'error':$v.RoadTransportPermitCode.$error}" v-show="selectedRole.value==3">
	        	<span class="labels"><b>*</b>道路运输许可证编号</span>
	        	<input type="text" class="text-input" placeholder="请输入道路运输许可证编号" v-model.trim="RoadTransportPermitCode" @input="$v.RoadTransportPermitCode.$touch()"/>
	        	<p v-if="$v.RoadTransportPermitCode.$dirty">
	        		<span class="tips" v-if="!$v.RoadTransportPermitCode.required">道路运输许可证编号不能为空</span>
	        	</p>
	        </div>
	        <div class="form-item" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>门头照</span>
	        	<ImageUpload :width="100" :height="100" @imgUrlBack="getDoorImg"></ImageUpload>
	        	<p v-if="$v.doorImg.$dirty">
	        		<span class="tips" v-if="!$v.doorImg.required">门头照不能为空</span>
	        	</p>
	        </div>
			<div class="form-item" v-show="selectedRole.value!=4">
	        	<span class="labels"><b>*</b>营业执照</span>
	        	<ImageUpload :width="150" :height="100" @imgUrlBack="getLicenseImg"></ImageUpload>
	        	<p v-if="$v.licenseImg.$dirty">
	        		<span class="tips" v-if="!$v.licenseImg.required">营业执照不能为空</span>
	        	</p>
			</div>
	        <div class="form-item" v-show="selectedRole.value==2||selectedRole.value==3">
	        	<span class="labels"><b>*</b>道路运输许可证</span>
	        	<ImageUpload :width="150" :height="100" @imgUrlBack="getRoadTransPermitImg"></ImageUpload>
	        	<p v-if="$v.roadTransPermitImg.$dirty">
	        		<span class="tips" v-if="!$v.roadTransPermitImg.required">道路运输许可证不能为空</span>
	        	</p>
			</div>

			<div class="form-item">
				<button type="button" class="btn saveBtn" :disabled="$v.validationGroup1.$invalid" v-if="selectedRole.value==1">保存</button>
				<button type="button" class="btn saveBtn" :disabled="$v.validationGroup2.$invalid" v-if="selectedRole.value==2">保存</button>
				<button type="button" class="btn saveBtn" :disabled="$v.validationGroup3.$invalid" v-if="selectedRole.value==3">保存</button>
				<button type="button" class="btn saveBtn" :disabled="$v.validationGroup4.$invalid" v-if="selectedRole.value==4">保存</button>
			</div>
			</div>
		</div>
		<transition name="fade">
			<GetLocationModal :width="1000" :height="520" :area="area" :isShowMapModel="isShowMapModel" v-show="isShowMapModel" @closeModal="closeMapModal"></GetLocationModal>
		</transition>
	</div>
</template>
<script>
	import ImageUpload from '../commonComponents/ImageUpload'
	import AreaSelector from '../commonComponents/AreaSelector'
	import GetLocationModal from '../commonComponents/GetLocation'
	import Multiselect from 'vue-multiselect'
	import { required,alphaNum,minLength,maxLength } from 'vuelidate/lib/validators'
	export default {
		data() {
			return {
				headerImg: '',
	            name: '',
	            idCard: '',
	            idCardImg: '',
	            companyName: '',
	            area: {
	            	"province": {
						"key": '',
						"value": '',
					},
					"city": {
						"key": '',
						"value": '',
					},
					"dist": {
						"key": '',
						"value": '',
					},
	            },
	            selectAreaOption: {
					isShow: false,
					width: 0,
					left: 0,
					top: 0
				},
				location: '',
	            adress: '',
	            creditCode: '',
	            noCarCarrierCode: '',
	            noCarCarrierAppKey: '',
	            RoadTransportPermitCode: '',
				doorImg: '',
				licenseImg: '',
				roadTransPermitImg: '',
				userSort: [
                    {
						value: 1,
						label: '无车承运人'
					},
					{
						value: 2,
						label: '物流企业'
					},
					{
						value: 3,
						label: '物流信息部'
					},
					{
						value: 4,
						label: '个人货主'
					},
                ],
				selectedRole: {
					value: 1,
					label: '无车承运人'
				},
				isShowMapModel: false,
			}
		},
		computed: {
			memberID() {
				return this.MEMBERINFO.memID;
			},
			areaValid() {
				return this.area.province.key
			}
		},
		validations: {
		    headerImg: {
		    	required,
		    },
		    name: {
		      	required,
		      	maxLength: maxLength(10)
		    },
		    idCard: {
		      	required,
		      	maxLength: maxLength(18)
		    },
		    idCardImg: {
		    	required
		    },
		    companyName: {
		    	required
		    },
		    adress: {
		    	required
		    },
		    creditCode: {
		    	required
		    },
		    noCarCarrierCode: {
		    	required
		    },
		    noCarCarrierAppKey: {
		    	required
		    },
		    RoadTransportPermitCode: {
		    	required
		    },
		    areaValid: {
		    	required
		    },
		    location: {
		    	required
		    },
		    doorImg: {
		    	required
		    },
		    licenseImg: {
		    	required
		    },
		    roadTransPermitImg: {
		    	required
		    },
		    validationGroup1: [
		    	'headerImg',
		    	'name',
		    	'idCard',
		    	'idCardImg',
		    	'companyName',
		    	'adress',
		    	'areaValid',
		    	'location',
		    	'doorImg',
		    	'licenseImg'
	    	],
	    	validationGroup2: [
		    	'headerImg',
		    	'name',
		    	'idCard',
		    	'idCardImg',
		    	'companyName',
		    	'adress',
		    	'areaValid',
		    	'location',
		    	'doorImg',
		    	'licenseImg',
		    	'roadTransPermitImg'
	    	],
		    validationGroup3: [
		    	'headerImg',
		    	'name',
		    	'idCard',
		    	'idCardImg',
		    	'companyName',
		    	'adress',
		    	'creditCode',
		    	'noCarCarrierCode',
		    	'noCarCarrierAppKey',
		    	'RoadTransportPermitCode',
		    	'areaValid',
		    	'location',
		    	'doorImg',
		    	'licenseImg',
		    	'roadTransPermitImg'
	    	],
	    	validationGroup4: [
		    	'headerImg',
		    	'name',
		    	'idCard',
		    	'idCardImg'
	    	],
		},
		created() {
			this.$store.commit({type:'selectChange',selected:-1});
		},
		methods: {
			authentication() {
				let URL = this.__webserver__ + 'mem/certifyPerson/recertification';
				var params ={
					"memID": this.memberID
				};
				this.$http.post(URL,params).then(
					(res) => {
						if (res.body.code == 200) {
							console.log(JSON.stringify(res.body));
						}else {
							this.showMsg(this,{msg: res.body.message,delay: 1000});
						}
					},
					(res) => {
						this.showMsg(this,{msg: '请求失败',delay: 1000});
						console.log(JSON.stringify(res.body));
					}
				)
			},
			getHeaderImg(url) {
				this.headerImg = url;
				this.$v.headerImg.$touch();
			},
			getIdCardImg(url) {
				this.idCardImg = url;
				this.$v.idCardImg.$touch();
			},
			getDoorImg(url) {
				this.doorImg = url;
				this.$v.doorImg.$touch();
			},
			getLicenseImg(url) {
				this.licenseImg = url;
				this.$v.licenseImg.$touch();
			},
			getRoadTransPermitImg(url) {
				this.roadTransPermitImg = url;
				this.$v.roadTransPermitImg.$touch();
			},
			selectArea(e) {
				this.selectAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getArea(obj) {
				this.area = obj;
				console.log(JSON.stringify(this.area));
				this.$v.areaValid.$touch();
			},
			selectRole(obj) {
				this.selectedRole = obj;
				console.log(obj);
			},
			showMapModel() {
				if (this.areaValid) {
					this.isShowMapModel = true;
				}else {
					this.$v.areaValid.$touch();
					return
				}
			},
			closeMapModal(obj) {
				this.isShowMapModel = false;
				if (obj) {
					console.log(obj.title);
					this.location = obj.title;
				};
				this.$v.location.$touch();
			},
		},
		components: {
			ImageUpload,
			AreaSelector,
			GetLocationModal,
			Multiselect
		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		color #878787
		font-weight bold
		height 40px
		line-height 40px
		padding 0 20px
		border-bottom 1px solid #f0f0f0
		font-size 14px
	.con
		padding 20px
		.title
			font-size 14px
			font-weight bold
			padding: 10px 15px
			color #666
		.info-con
			padding-left 100px
		.locationPosition
			border 1px solid #dddee1
			height 40px
			line-height 26px
			padding 6px 12px
			border-radius 4px
			background url('../../../static/img/location.png') no-repeat right center #fff
			cursor pointer
	.fade-enter-active
	.fade-leave-active
		transition opacity .5s
	.fade-enter
	.fade-leave-to
		opacity 0
.form-item
	padding 0 200px 0 140px
	position relative
	margin-bottom 15px
	width 730px
	.labels
		width 130px
		padding-right 5px
		position absolute
		left 0
		top 0
		height 40px
		line-height 40px
		text-align right
		color #6cc
		b
			color #f90
			margin-right 3px
	&.error
		.text-input
			border-color #f30
	.tips
		color #f30
		position absolute
		left 545px
		width 180px
		text-overflow ellipsis
		overflow hidden
		white-space nowrap
		line-height 40px
		top 0
.saveBtn
	background rgba(102,204,204,1)
	color #fff
	border none
	height 40px
	line-height 40px
	display block
	width 100%
	border-radius 4px
	font-size 14px
	outline none
	cursor pointer
	&:hover
		background rgba(102,204,204,.9)
	&:active
		background rgba(102,204,204,.95)
	&[disabled]
		border 1px solid #dddee1
		background #f7f7f7
		cursor not-allowed
		color #ddd
</style>