<template>
<div>
	<div v-show="isAddSendTruck">			
		<div class="tit" v-show="!isEdit">发布货源</div>
		<div class="tit" v-show="isEdit">编辑常发货源</div>
		<div class="con">
		    <p class="title">装卸信息</p>
		    <div class="form-item" :class="{'error':$v.startAreaValid.$error}">
		        <span class="labels"><b>*</b>起始地</span>
		        <div class="text-input AreaSelect" @click.stop="selectStartArea($event)">
		        	<span class="selectTips" v-if="startAreaValid">
						<span v-text="startArea.province.value"></span>
						<span v-text="startArea.city.value"></span>
						<span v-text="startArea.dist.value"></span>
					</span>
		        </div>
		        <AreaSelector :option="selectStartAreaOption" @selectArea="getStartArea"></AreaSelector>
		        <p v-if="$v.startAreaValid.$dirty">
	        		<span class="tips" v-if="!$v.startAreaValid.required">起始地不能为空</span>
	        	</p>
		    </div>
		    <div class="form-item" :class="{'error':$v.endAreaList.$error}">
		        <span class="labels"><b>*</b>目的地</span>
		        <div class="text-input AreaSelect height-auto" @click.stop="selectEndArea($event)">
			        <span class="selectTips" v-for="endArea in endAreaList" v-if="endArea.province.key">
						<span v-text="endArea.province.value"></span>
						<span v-text="endArea.city.value"></span>
						<span v-text="endArea.dist.value"></span>
						<span class="close-icon" title="关闭" @click.stop="closeTips(endArea.province.key)"></span>
					</span>
				</div>
		        <AreaSelectorMultiple :option="selectEndAreaOption" @selectArea="getEndArea"></AreaSelectorMultiple>
		        <p v-if="$v.endAreaList.$dirty">
	        		<span class="tips" v-if="!$v.endAreaList.required">目的地不能为空</span>
	        	</p>
		    </div>
		    <div class="form-item" :class="{'error':$v.loadDate.$error}">
		        <span class="labels"><b>*</b>装货时间</span>
		        <input type="text" id="goodsDate" class="text-input" placeholder="请选择装货时间" v-model="loadDate"/>
		        <p v-if="$v.loadDate.$dirty">
	        		<span class="tips" v-if="!$v.loadDate.required">装货时间不能为空</span>
	        	</p>
		    </div>
		    <div class="clearfix">
		        <p class="title">货物信息</p>
		        <div class="form-item" :class="{'error':$v.goodsName.$error}">
		            <span class="labels"><b>*</b>货物名称</span>
		            <input type="text" class="text-input" placeholder="请输入货物名称" v-model.trim="goodsName" @input="$v.goodsName.$touch()"/>
		            <p v-if="$v.goodsName.$dirty">
		        		<span class="tips" v-if="!$v.goodsName.required">货物名称不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item" :class="{'error':$v.selectGoodsType.$error}">
		            <span class="labels"><b>*</b>货物类型</span>
		            <Multiselect :options="cargoTypeList" v-model="selectGoodsType" label="name" :searchable="false" :close-on-select="true" :show-labels="false" @close="$v.selectGoodsType.$touch()" placeholder="请选择货物类型"></Multiselect>
		            <p v-if="$v.selectGoodsType.$dirty">
		        		<span class="tips" v-if="!$v.selectGoodsType.required">货物类型不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item inline">
		            <span class="labels"><b>*</b>包装</span>
		            <Multiselect :options="cargoPackageList" v-model="selectPackageType" label="name" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择货物包装" @close="$v.selectPackageType.$touch()"></Multiselect>
		        </div>
		        <div class="form-item inline">
		            <span class="labels"><b>*</b>重量</span>
		            <input type="text" class="text-input hasUnit" placeholder="请输入重量" v-model.trim="goodsWeight" @input="$v.goodsWeight.$touch()"/>
		            <span class="unit">吨</span>
		        </div>
		        <p v-if="$v.selectPackageType.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.selectPackageType.required">货物包装不能为空</span>
	        	</p>
	        	<p v-if="$v.goodsWeight.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.goodsWeight.required">重量不能为空</span>
	        	</p>
		    </div>
		    <div class="clearfix">
		        <div class="form-item inline">
		            <span class="labels"><b>*</b>体积</span>
		            <input type="text" class="text-input hasUnit" placeholder="请输入体积" v-model.trim="goodsVolume" @input="$v.goodsVolume.$touch()"/>
		            <span class="unit">方</span>
		        </div>
		        <div class="form-item inline">
		            <span class="labels"><b>*</b>数量</span>
		            <input type="text" class="text-input hasUnit" placeholder="请输入数量" v-model.trim="goodsCount" @input="$v.goodsCount.$touch()"/>
		            <span class="unit">件</span>
		        </div>
		        <p v-if="$v.goodsVolume.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.goodsVolume.required">货物包装不能为空</span>
	        	</p>
	        	<p v-if="$v.goodsCount.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.goodsCount.required">重量不能为空</span>
	        	</p>
		    </div>
		    <div class="clearfix">
		        <p class="title">用车要求</p>
		        <div class="form-item" :class="{'error':$v.selectTruckSort.$error}">
		            <span class="labels"><b>*</b>车型</span>
		            <Multiselect :options="truckTypeList" v-model="selectTruckSort" label="name" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择车型" @close="$v.selectTruckSort.$touch()"></Multiselect>
		            <p v-if="$v.selectTruckSort.$dirty">
		        		<span class="tips" v-if="!$v.selectTruckSort.required">车型不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item" :class="{'error':$v.selectTruckLength.$error}">
		            <span class="labels"><b>*</b>车长</span>
		            <Multiselect :options="truckLengthList" v-model="selectTruckLength" :multiple="true" label="name" :searchable="false" :close-on-select="true" :show-labels="false" track-by="name" :hide-selected="true" placeholder="请选择车长" @close="$v.selectTruckLength.$touch()"></Multiselect>
		            <p v-if="$v.selectTruckLength.$dirty">
		        		<span class="tips" v-if="!$v.selectTruckLength.required">车长不能为空</span>
		        	</p>
		        </div>
		        <div class="form-item" :class="{'error':$v.truckCount.$error}">
		            <span class="labels"><b>*</b>数量</span>
		            <input type="text" class="text-input" placeholder="请输入数量" v-model.trim="truckCount" @input="$v.truckCount.$touch()"/>
		            <p v-if="$v.truckCount.$dirty">
		        		<span class="tips" v-if="!$v.truckCount.required">数量不能为空</span>
		        	</p>
		        </div>
		    </div>
		    <div class="clearfix">
		        <p class="title">价格模式</p>
			    <div class="form-item" :class="{'error':$v.selectPriceModel.$error}">
		            <span class="labels"><b>*</b>模式</span>
		            <Multiselect :options="PriceModel" v-model="selectPriceModel" label="name" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="请选择价格模式" @close="$v.selectPriceModel.$touch()"></Multiselect>
		            <p v-if="$v.selectPriceModel.$dirty">
		        		<span class="tips" v-if="!$v.selectPriceModel.required">价格模式不能为空</span>
		        	</p>
		        </div>
			    <div class="form-item inline">
		            <span class="labels"><b>*</b>单价</span>
		            <input type="text" class="text-input hasUnit" placeholder="请输入单价" v-model="unitPrice" @input="$v.unitPrice.$touch()"/>
		            <span class="unit">元/吨</span>
		        </div>
		        <div class="form-item inline">
		            <span class="labels"><b>*</b>总价</span>
		            <input type="text" class="text-input hasUnit" placeholder="总价" v-model="totalPrice" @input="$v.totalPrice.$touch()"/>
		            <span class="unit">元</span>
		        </div>
		        <p v-if="$v.unitPrice.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.unitPrice.required">单价不能为空</span>
	        	</p>
	        	<p v-if="$v.totalPrice.$dirty">
	        		<span class="tips inlineTips" v-if="!$v.totalPrice.required">总价不能为空</span>
	        	</p>
		    </div>
		    <div class="clearfix">
		        <p class="title">其它</p>
		        <div class="form-item">
			        <span class="labels">备注</span>
			        <div class="text-input remark height-auto" ref="remark" @click.stop="addRemark($event)">
			        	<span class="selectTips" v-for="selectedLabel in selectedLabels">
			        		<span v-text="selectedLabel.name"></span>
							<span class="close-icon" title="关闭" @click.stop="closeRemark(selectedLabel)"></span>
						</span>
			        </div>
			        <SelectByLabel :selectedLabels="selectedLabels" :obj="truckSrcRemarkList" :option="selectByLabelOption" @pushLabel="pushLabel"></SelectByLabel>
			    </div>
			    <div class="form-item">
			        <span class="labels">不可见城市</span>
			        <div class="text-input AreaSelect height-auto" @click.stop="selectInvisibleArea($event)">
				        <span class="selectTips" v-for="invisibleArea in invisibleAreaList" v-if="invisibleArea.province.key">
							<span v-text="invisibleArea.province.value"></span>
							<span v-text="invisibleArea.city.value"></span>
							<span v-text="invisibleArea.dist.value"></span>
							<span class="close-icon" title="关闭" @click.stop="closeTips2(invisibleArea.province.key)"></span>
						</span>
					</div>
			        <AreaSelectorMultiple :option="selectInvisibleAreaOption" @selectArea="getInvisibleArea"></AreaSelectorMultiple>
			    </div>
			    <div class="form-item">
			        <span class="labels">推送车辆</span>
			        <div class="text-input remark AddSendTruck height-auto" @click.stop="addSendTruck">
			        	<span class="selectTips" v-for="selectSendTruck in selectSendTruckList">
							<span v-text="selectSendTruck.realName"></span>
							<span class="close-icon" title="关闭" @click.stop="removeSendTruck(selectSendTruck)"></span>
						</span>
			        </div>
			    </div>
		    </div>
		    <div class="form-item checkboxItem" v-if="!isEdit">
		        <CheckBox content="存为常发货源" @isChecked="checkOften"></CheckBox>
		    </div>
		    <div class="form-item">
		        <button type="button" class="btn" :disabled="$v.validationGroup.$invalid" @click="publishGoods()" v-if="!isEdit">发布货源</button>
		        <button type="button" class="btn" :disabled="$v.validationGroup.$invalid" v-else>保存</button>
		    </div>
		</div>
	</div>
	<div v-show="!isAddSendTruck">
		<div class="tit">推送车辆</div>
		<div class="push_con clearfix">
			<div class="filter clearfix">
				<p class="labels">筛选条件</p>
				<input type="text" placeholder="请输入搜索关键字" class="text-input"/>
				<div class="posr AreaSelectBox">
					<div class="text-input AreaSelect" @click.stop="selectSearchArea($event)">
						<span class="placeholder" v-show="searchPlaceholder">请选择城市</span>
			        	<span class="selectAreaResult" :title="searchArea.province.value+searchArea.city.value+searchArea.dist.value" v-text="searchArea.province.value+searchArea.city.value+searchArea.dist.value">
						</span>
			        </div>
			        <AreaSelector :option="selectSearchAreaOption" @selectArea="getSearchArea"></AreaSelector>
		        </div>
				<Multiselect :options="cargoTypeList" label="label" :searchable="false" :close-on-select="true" :show-labels="false" @close="$v.selectGoodsType.$touch()" placeholder="请选择车辆范围"></Multiselect>
				<Multiselect :options="cargoTypeList" label="label" :searchable="false" :close-on-select="true" :show-labels="false" @close="$v.selectGoodsType.$touch()" placeholder="请选择车辆状态"></Multiselect>
				<button type="button" class="btn">搜索</button>
				<p class="checkboxItem">
		        	<CheckBox content="车源流向：云南昆明 至 广东深圳"></CheckBox>
				</p>
			</div>
			<div class="clearfix mb">
			<div class="filterResult fl mt">
				<p class="title posr">筛选结果 <CheckBoxCircle :value="null" :isCheck="isCheckTruckSourceAll" @isChecked="checkAllSendTruck"></CheckBoxCircle></p>
				<div class="resultCon">
					<div class="listItem" v-for="truckSource in truckSourceList">
						<div class="pic fl">
							<img v-if="truckSource.headPicture" :src="__imgserver__+truckSource.headPicture"/>
							<img v-else src='../../assets/img/defaultImg.svg'/>
							<span class="truckStatus truckStatus1" v-if="truckSource.transStatus=='OnWay'&&truckSource.isReturn=='Y'">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckSource.transStatus=='OnWay'&&truckSource.isReturn!='Y'">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckSource.transStatus=='Empty'&&truckSource.isReturn=='Y'">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else-if="truckSource.transStatus=='Empty'&&truckSource.isReturn!='Y'">空车</span>
							<span class="truckStatus" v-else="truckSource.transStatus==''"></span>
						</div>
						<div class="lineInfo fl">
							<p class="start" :title="(truckSource.areaFromBaseArea?truckSource.areaFromBaseArea.fullName:'')|clearComma">{{(truckSource.areaFromBaseArea?truckSource.areaFromBaseArea.fullName:'')}}</p>
							<p class="end">
								<span v-for="(item,i) in truckSource.areaToBaseAreaList">{{item.fullName|clearComma}}<b v-if="truckSource.areaToBaseAreaList.length-1 != i">，</b></span>
							</p>
							<p class="pos" v-text="truckSource.createTime"></p>
						</div>
						<div class="userInfo fl">
							<p class="user">{{truckSource.realName}}
								<RateDisplay :score="truckSource.score"></RateDisplay>
								<span class="attention">未关注</span>
							</p>
							<p class="vehicleInfo" v-html="truckSource.plateNo+'&nbsp;'+truckSource.lengthName.name+'&nbsp;'+truckSource.loads+'吨'+'&nbsp;'+truckSource.truckTypeName.name"></p>
							<p class="otherInfo">车龄：{{truckSource.mileage}}年 驾龄：10年</p>
						</div>
						<CheckBoxCircle :value="truckSource" :isCheck="(selectSendTruckList.indexOf(truckSource)>-1)" @isChecked="checkOneSendTruck"></CheckBoxCircle>
					</div>
					<div class="listFooter text-center">
						<Paging></Paging>
					</div>
				</div>
			</div>
			<div class="selectedResult fr mt">
				<p class="title">已选择</p>
				<div class="selectedCon">
					<div class="selectedItem" v-for="selectSendTruck in selectSendTruckList">
		                <div class="pic fl">
		                	<img v-if="selectSendTruck.headPicture" :src="__imgserver__+selectSendTruck.headPicture"/>
		                	<img v-else src='../../assets/img/defaultImg.svg'/>
		                </div>
		                <div class="vehicleInfo fl">
		                <p>{{selectSendTruck.realName}} {{selectSendTruck.plateNo}} 
							<span class="truckStatus truckStatus1" v-if="selectSendTruck.transStatus=='OnWay'&&selectSendTruck.isReturn=='Y'">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="selectSendTruck.transStatus=='OnWay'&&selectSendTruck.isReturn!='Y'">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="selectSendTruck.transStatus=='Empty'&&selectSendTruck.isReturn=='Y'">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else-if="selectSendTruck.transStatus=='Empty'&&selectSendTruck.isReturn!='Y'">空车</span>
							<span class="truckStatus" v-else="selectSendTruck.transStatus==''"></span>
		                </p>
		                <p v-html="selectSendTruck.truckTypeName.name+'&nbsp;'+selectSendTruck.plateNo+'&nbsp;'+selectSendTruck.lengthName.name+'&nbsp;'+selectSendTruck.loads+'吨'"></p>
		                </div>
		                <p class="lineInfo">
			                <span>{{(selectSendTruck.areaFromBaseArea?selectSendTruck.areaFromBaseArea.fullName:'')|clearComma}}</span>
			                <span class="arrow"></span>
			                <span>
			                	<span v-for="(item,i) in selectSendTruck.areaToBaseAreaList">{{item.fullName|clearComma}}<b v-if="selectSendTruck.areaToBaseAreaList.length-1 != i">，</b></span>
			                </span>
		                </p>
		                <span class="removeBtn" @click.stop="removeSendTruck(selectSendTruck)"></span>
		            </div>
				</div>
			</div>
			</div>
			<div class="clearfix text-center handle">
				<button type="button" class="backBtn" @click.stop="isAddSendTruck = true">返回</button> 
				<button type="button" class="btn sendBtn" @click.stop="isAddSendTruck = true">推送给 {{selectSendTruckList.length}} 名司机</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import ImageUpload from '../commonComponents/ImageUpload'
	import CheckBox from '../commonComponents/CheckBox'
	import AreaSelector from '../commonComponents/AreaSelector'
	import AreaSelectorMultiple from '../commonComponents/AreaSelectorMultiple'
	import SelectByLabel from '../commonComponents/SelectByLabel'
	import Multiselect from 'vue-multiselect'
	import { required,alphaNum,minLength,maxLength } from 'vuelidate/lib/validators'
	import RateDisplay from '../commonComponents/RateDisplay'
	import Paging from '../commonComponents/Paging'
	import CheckBoxCircle from '../commonComponents/CheckBoxCircle'
	import common from '../../common/common'
	export default {
		data() {
			return {
				startArea: {
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
				endAreaList: [],
				loadDate: '',
				goodsName: '',
				selectGoodsType: null,
				selectPackageType: null,
				goodsWeight: '',
				goodsVolume: '',
				goodsCount: '',
				selectTruckSort: null,
				selectTruckLength: null,
				truckCount: '',
				selectPriceModel: null,
				unitPrice: '',
				totalPrice: '',
				invisibleAreaList: [],
				searchArea: {
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
				truckTypeList: [],
                truckLengthList:[],
                selectedtruckLength: [],
                cargoTypeList:[],
                PriceModel:[
	                {
                		code:1,
						name: '定价'
                	},
                	{
                		code:2,
						name: '议价'
                	},
                	{
                		code:3,
						name: '信息费'
                	},
                ],
                cargoPackageList:[],
                truckSrcRemarkList: [],
				selectedLabels: [],
				selectedRole: 1,
				selectStartAreaOption: {
					isShow: false,
					left: 0,
					top: 0
				},
				selectEndAreaOption: {
					isShow: false,
					left: 0,
					top: 0
				},
				selectInvisibleAreaOption: {
					isShow: false,
					left: 0,
					top: 0
				},
				selectByLabelOption: {
					isShow: false,
					width: 0,
					left: 0,
					top: 0
				},
				selectSearchAreaOption: {
					isShow: false,
					left: 0,
					top: 0
				},
				truckSourceList: [],
				areaToBaseArea: '',
				selectSendTruckList: [],
				isAddSendTruck: true,
				searchPlaceholder: true,
				isOften: false,
				oftenPublishDetail: null
			}
		},
		computed: {
			memID() {
				return this.$store.state.memberInfo.memID
			},
			isEdit() {
				return this.$route.query.id ? true : false
			},
			startAreaValid() {
				return this.startArea.province.key
			},
			isCheckTruckSourceAll() {
				for(let i = 0; i < this.truckSourceList.length; i++){
			       	if(this.selectSendTruckList.indexOf(this.truckSourceList[i]) == -1) {
			       		return false;
			       	}
			    }
			    return true;
			}
		},
		validations: {
		    startAreaValid: {
		      	required
		    },
		    endAreaList: {
		    	required
		    },
		    loadDate: {
		    	required
		    },
		    goodsName: {
		    	required
		    },
		    selectGoodsType: {
		    	required
		    },
		    selectPackageType: {
		    	required
		    },
		    goodsWeight: {
		    	required
		    },
		    goodsVolume: {
		    	required
		    },
		    goodsCount: {
		    	required
		    },
		    selectTruckSort: {
		    	required
		    },
		    selectTruckLength: {
		    	required
		    },
		    truckCount: {
		    	required
		    },
		    selectPriceModel: {
		    	required
		    },
		    unitPrice: {
		    	required
		    },
		    totalPrice: {
		    	required
		    },
		    validationGroup: [
			    'startAreaValid',
			    'endAreaList',
			    'loadDate',
			    'goodsName',
			    'selectGoodsType',
			    'selectPackageType',
			    'goodsWeight',
			    'goodsVolume',
			    'goodsCount',
			    'selectTruckSort',
			    'selectTruckLength',
			    'truckCount',
			    'selectPriceModel',
			    'unitPrice',
			    'totalPrice',
		    ]
		},
		created() {
			this.getConst('CargoType');
			this.getConst('CargoPackage');
			this.getConst('TruckType');
			this.getConst('TruckLength');
			this.getConst('TruckSrcRemark');
			if (this.isEdit) {
				this.getOftenPublishDetail()
			}
		},
		mounted() {
			var that = this;
			laydate.render({
				elem: '#goodsDate',
				done: function(value, date){
					that.loadDate = value;
					that.$v.loadDate.$touch();
				    console.log('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
		  		}
			});
		},
		methods: {
			selectStartArea(e) {
				common.trigger(document);
				this.selectStartAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getStartArea(obj) {
				this.startArea = obj;
				console.log(JSON.stringify(this.startArea));
				this.$v.startAreaValid.$touch();
			},
			selectEndArea(e) {
				common.trigger(document);
				this.selectEndAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getEndArea(arr) {
				this.endAreaList = arr;
				console.log(JSON.stringify(this.endAreaList));
				this.$v.endAreaList.$touch();
			},
			selectInvisibleArea(e) {
				this.selectInvisibleAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getInvisibleArea(arr) {
				this.invisibleAreaList = arr;
				console.log(JSON.stringify(this.invisibleAreaList));
			},
			//删除已选的标签
			closeTips(key) {
				for (let i in this.endAreaList) {
					if(this.endAreaList[i].province.key == key) {
						this.endAreaList.splice(i,1);
					}
				};
				console.log(JSON.stringify(this.endAreaList));
			},
			closeTips2(key) {
				for (let i in this.invisibleAreaList) {
					if(this.invisibleAreaList[i].province.key == key) {
						this.invisibleAreaList.splice(i,1);
					}
				};
				console.log(JSON.stringify(this.invisibleAreaList));
			},
			addRemark(e) {
				this.selectByLabelOption = {
					isShow: true,
					width: e.target.offsetWidth+'px',
					left: e.target.offsetLeft+'px',
				};
			},
			closeRemark(obj) {
				if (obj) {
					let index = this.selectedLabels.indexOf(obj);
					if (index > -1) {
						this.selectedLabels.splice(index,1);
					}
				};
				console.log(JSON.stringify(this.selectedLabels));
			},
			pushLabel(obj) {
				this.selectedLabels = obj;
				console.log(JSON.stringify(this.selectedLabels));
			},
			//进入选择推送车辆
			addSendTruck() {
				this.isAddSendTruck = false;
				this.getTruckList();
			},
			//查询车辆列表
			getTruckList() {
				let URL = this.__webserver__ + 'truck/fleet/findPage';
				var params = {
					// pageSize: 5
				};
				this.$http.post(URL,params).then(
					(res) => {
						console.log(JSON.stringify(res.body.message));
						if (res.body.code == 200) {
							this.truckSourceList = res.body.data.list;
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			},
			selectSearchArea(e) {
				this.selectSearchAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getSearchArea(obj) {
				this.searchPlaceholder = false;
				if (obj.province.key) {
					this.searchPlaceholder = false;
					this.searchArea = obj;
				}else {
					this.searchPlaceholder = true;
				}
				console.log(JSON.stringify(this.startArea));
			},
			checkAllSendTruck(value,isChecked) {
				if (!isChecked) {
					//如果没有全选，应将剩余未选的子项添加进来
					for (let i = 0; i < this.truckSourceList.length; i++) {
						let index = this.selectSendTruckList.indexOf(this.truckSourceList[i]);
						if (index == -1) {
							this.selectSendTruckList.push(this.truckSourceList[i]);
						}
					}
				}else {
					//如果全选，则从已选的项去除当前页所有的项
					for (let j = 0; j < this.truckSourceList.length; j++) {
						let index = this.selectSendTruckList.indexOf(this.truckSourceList[j]);
						if (index > -1) {
							this.selectSendTruckList.splice(index,1);
						}
					}
				}
			},
			checkOneSendTruck(value,isChecked) {
				if (!isChecked) {
					this.selectSendTruckList.push(value);
				}else {
					let index = this.selectSendTruckList.indexOf(value);
					if (index > -1) {
						this.selectSendTruckList.splice(index,1);
					}
				};
			},
			removeSendTruck(value) {
				let index = this.selectSendTruckList.indexOf(value);
				if (index > -1) {
					this.selectSendTruckList.splice(index,1);
				};
			},
			checkOften(bool) {
				this.isOften = bool;
			},
			//发布货源
			publishGoods() {
				let URL = this.__webserver__ + 'cargoSource/add';
				var params = {
					"memID": this.memID,
					"areaFrom": this.startArea.dist.key || this.startArea.city.key || this.startArea.province.key,
					"areaTo": this.areaArrToStr(this.endAreaList),
					"loadingDate": this.loadDate,
					"cargoName": this.goodsName,
					"cargoTypeID": this.selectGoodsType.code,
					"cargoPackage": this.selectPackageType.code,
					"cargoWeight": this.goodsWeight,
					"cargoVolume": this.goodsVolume,
					"cargoNum": this.goodsCount,
					"truckType": this.selectTruckSort.code,
					"truckLength": this.arrToStr(this.selectTruckLength,'code'),
					"truckNum": this.truckCount,
					"cargoFreightType": this.selectPriceModel.name,
					"cargoFreightPrice": this.unitPrice,
					"cargoFreightTotalPrice": this.totalPrice,
					"remark": this.arrToStr(this.selectedLabels,'name'),
					"invisibleCity": this.areaArrToStr(this.invisibleAreaList),
					"publishTo": this.arrToStr(this.selectSendTruckList,'memID'),
					"isFrequent": this.isOften?'Y':'N'
				};
				console.log(JSON.stringify(params));
				this.$http.post(URL,params).then(
					(res) => {
						if (res.body.code == 200) {
							this.showMsg(this,{msg: '发布成功', delay: 1000});
							this.$router.push({name:'OftenPublish',query: {active: 22}});
						}else {
							this.showMsg(this,{msg: res.body.message, delay: 1000});
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			},
			getOftenPublishDetail() {
				let URL = this.__webserver__ + 'frequent/detail';
				var params = {
					frequentConcernID: this.$route.query.id
				};
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.oftenPublishDetail = res.body.data;
							this.$nextTick(() => {
								this.startArea = {
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
									}
								}
								this.loadDate = res.body.data.loadingDate;
								this.goodsName = res.body.data.cargoName;
								this.selectGoodsType = {
									code: res.body.data.cargoTypeID,
									name: this.arrFindName(this.cargoTypeList, res.body.data.cargoTypeID)
								};
								this.selectPackageType = {
									code: res.body.data.cargoPackage,
									name: this.arrFindName(this.cargoPackageList, res.body.data.cargoPackage)
								};
								this.goodsWeight = res.body.data.cargoWeight;
								this.goodsVolume = res.body.data.cargoVolume;
								this.goodsCount = res.body.data.cargoNum;
								this.selectTruckSort = {
									code: res.body.data.truckType,
									name: this.arrFindName(this.truckTypeList, res.body.data.truckType)
								};
								this.truckCount = res.body.data.truckNum;
								this.selectPriceModel = {
									code: '',
									name: res.body.data.cargoFreightType
								};
								this.unitPrice = res.body.data.cargoFreightPrice;
								this.totalPrice = res.body.data.cargoFreightTotalPrice;
							})
							// console.log(JSON.stringify(this.oftenPublishDetail));
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			}
		},
		components: {
			ImageUpload,
			CheckBox,
			AreaSelector,
			AreaSelectorMultiple,
			SelectByLabel,
			Multiselect,
			RateDisplay,
			Paging,
			CheckBoxCircle
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
		padding 20px 100px
		.locationPosition
			border 1px solid #dddee1
			height 34px
			line-height 34px
			padding 0 12px
			border-radius 4px
			background url('../../../static/img/location.png') no-repeat right center #fff
			cursor pointer
	.fade-enter-active
	.fade-leave-active
		transition opacity .5s
	.fade-enter
	.fade-leave-to
		opacity 0
	.title
		height 40px
		line-height 40px
		font-size 14px
		color #878787
	.form-item
		margin-bottom 15px
		position relative
		padding 0 330px 0 110px
		min-height 40px
		.AddSendTruck
			cursor pointer
		.remark
			min-height 40px
			padding-bottom 0
			.ipt
				height 26px
				min-width 100px
				outline none
				border none
			&:focus
				border-radius 4px 4px 0 0
		&.inline
			width 250px
			padding 0 0 0 110px
			float left
		&.error
			.text-input
				border-color #ff5d44
			.tips
				color #ff5d44
				position absolute
				left 515px
				width 180px
				text-overflow ellipsis
				overflow hidden
				white-space nowrap
				line-height 40px
				top 0
		&.checkboxItem
			height 24px
			min-height 24px
		.labels
			color #aeaeae
			width 100px
			height 40px
			line-height 40px
			position absolute
			left 0
			top 0
			text-align right
			color #6cc
			b
				color #f90
				margin-right 3px
		.unit
			position absolute
			right 16px
			top 11px
			color #aaa
		.hasUnit
			padding-right 50px
	.inlineTips
		color #ff5d44
		width 180px
		margin-left 15px
		text-overflow ellipsis
		overflow hidden
		white-space nowrap
		line-height 20px
	.btn
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
	.push_con
		padding 20px
		.filter
			.labels
				line-height 40px
				height 40px
				font-size 14px
				font-weight bold
				color #585757
			.text-input
			.multiselect
			.AreaSelectBox
				width 200px
				display inline-block
				margin-right 10px
				vertical-align top
			.btn
				width 80px
				display inline-block
			.checkboxItem
				padding 8px 0
				height 40px
			
				
			.AreaSelect
				padding-left 12px
				.placeholder
					line-height 28px
					color #ddd
				.selectAreaResult
					width 160px
					line-height 28px
					display block
					text-overflow ellipsis
					overflow hidden
					white-space nowrap
		.filterResult
			width 650px
			border 1px solid #f0f0f0
			border-radius 4px
			.title
				padding 0 15px
				.checkbox
					position absolute
					right 20px
					top 8px
			.resultCon
				height 620px
			.listItem
				padding:10px
				height 110px
				position relative
				border-top 1px solid #f0f0f0
				
				.checkbox
					position absolute
					right 20px
					top 45px
				.pic
					width 70px
					img
						width 70px
						height 70px
						border-radius 8px
						margin-bottom 5px
					
				p
					line-height 30px
					height 30px
					color #666
					font-size 14px
					padding-left 30px
					background-repeat no-repeat
					background-position left center
				.lineInfo
					padding 0 20px 0 10px
					width 185px
					p
						text-overflow ellipsis
						overflow hidden
						white-space nowrap
						&.start
							background-image url('../../../static/img/start_icon.png')
						&.end
							background-image url('../../../static/img/end_icon.png')
						&.pos
							background-image url('../../../static/img/pos_icon.png')
							color #afafaf
							font-size 12px
				.userInfo
					padding:0 20px
					width 340px
					border-left 1px solid #f0f0f0
					p
						text-overflow ellipsis
						overflow hidden
						white-space nowrap
						&.user
							background-image url('../../../static/img/user_icon.png')
						&.vehicleInfo
							background-image url('../../../static/img/vehicle_icon.png')
						&.otherInfo
							background-image url('../../../static/img/otherInfo_icon.png')
				.attention
					background url('../../../static/img/attention_icon.png') no-repeat left center
					padding-left 20px
					color #d4d4d4
					&.attentioned
						background-image url('../../../static/img/attentioned_icon.png')
						color #ffc426		
			.listFooter
				border-top 1px solid #f0f0f0
		.selectedResult
			width 320px
			border 1px solid #f0f0f0
			border-radius 4px
			.title
				padding 0 15px
				border-bottom 1px solid #f0f0f0
			.selectedCon
				padding 10px
				background #f9f9f9
				height 620px
				overflow-y scroll
				.selectedItem
					padding 10px 30px 34px 70px
					height 94px
					border-bottom 1px solid #f0f0f0
					border-radius 4px
					position relative
					display block
					background #fff
					box-shadow 1px 1px 3px rgba(0, 0, 0, .1)
					margin-bottom 10px
					&.last
					&:last-child
						border-bottom none
						margin-bottom 0
					p
						line-height 24px
						color #666
						text-overflow ellipsis
						overflow hidden
						white-space nowrap
					.pic
						width 50px
						height 50px
						position absolute
						left 10px
						top 10px
						img
							width 50px
							height 50px
							border-radius 8px
					.vehicleInfo
						width 180px
					.lineInfo
						color #6cc
						font-size 14px
						font-weight bold
						position absolute
						width 260px
						top 60px
						left 10px
						padding-left 30px
						height 34px
						line-height 34px
						background url('../../../static/img/lineInfo.png') no-repeat left center
						span
							display inline-block
							vertical-align middle
							&.arrow
								width 30px
								height 34px
								background url('../../../static/img/lin_arrow.png') no-repeat center
					.removeBtn
						width 30px
						height 30px
						background url('../../assets/img/remove.svg') no-repeat center 50% 
						display block
						position absolute
						right 5px
						top 5px
						cursor pointer
	.handle
		.backBtn
			display inline-block
			height 40px
			line-height 40px
			padding 0 20px
			vertical-align top
			border-radius 4px
			background #fff
			border 1px solid #f0f0f0
			color #999
			cursor pointer
		.sendBtn
			width 220px
			display inline-block
			vertical-align top
	.truckStatus
		border 1px solid transparent
		border-radius 4px
		margin-left 3px
		&.truckStatus1
			border-color #20a0ff
			background #fff;
			color #20a0ff
			padding:0 20px 0 5px
			position relative
			b
				color #fff
				background #20a0ff
				font-style normal
				height 16px
				line-height 16px
				display inline-block
				width 16px
				text-align center
				position absolute
				right 0
				top 0
		&.truckStatus2
			border-color #20a0ff
			color #20a0ff
			padding:0 13px
		&.truckStatus3
			border-color #6cc
			color #6cc
			padding:0 26px 0 11px
			position relative
			b
				color #fff
				background #6cc
				font-style normal
				height 16px
				line-height 16px
				display inline-block
				width 16px
				text-align center
				position absolute
				right 0
				top 0
		&.truckStatus4
			border-color #6cc
			color #6cc
			padding:0 19px
</style>