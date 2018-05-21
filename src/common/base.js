export default function install(Vue, options) {
	Vue.prototype.__webserver__ = process.env.API_URI
	Vue.prototype.__imgserver__ = process.env.API_IMG_URI

	/*每页条数*/
	Vue.prototype.PAGESIZE = 10
    /*获取localStorage中的会员信息*/
    // Vue.prototype.MEMBERINFO = JSON.parse(localStorage.getItem('memberInfo'))
    /*获取sessionStorage中的常量*/
    Vue.prototype.CONSTLIST = JSON.parse(sessionStorage.getItem('constList'))

	/**author:Caoanlong *day:2017-09-06
	 * 获取常量(通过网络接口)
	 * @param type 代表要获取的常量类型
	 * -------------------------------- *
	 * @param CargoType        货物类型
	 * @param FreightUnit      运费单位
	 * @param CargoPackage     货物包装
	 * @param TruckType            车型
	 * @param TruckLength          车长
	 * @param CargoSrcRemark   车源备注
	 * @param TruckSrcRemark   货源备注
	 * @param TruckLength          车长
	 * @param PlateNoType      车牌类型
	 */
	Vue.prototype.getConst = function(type) {
		var typeN = ''
		if (type) {
			typeN = type[0].toLowerCase()+type.substring(1,type.length)
		}else {
			typeN = 'const'
		};
		let URL = this.__webserver__ + 'adv/baseConstant/findByType'
		var params = {
			type: type||''
		};
		this.$http.get(URL,{params:params}).then((res) => {
			if (res.body.code == 200) {
				var list = []
				if (type) {
					for (let i in res.body.data) {
						list.push({
							"code": res.body.data[i].constStdID,
							"name": res.body.data[i].name
						})
					}
				}else {
					list = res.body.data
				}
				this[typeN+'List'] = list
			}
		})
	}
	/**author:Caoanlong *day:2017-09-06
	 * 获取常量(通过缓存从sessionStorage中获取)
	 * @param type 代表要获取的常量类型
	 * -------------------------------- *
	 * @param CargoType        货物类型
	 * @param FreightUnit      运费单位
	 * @param CargoPackage     货物包装
	 * @param TruckType            车型
	 * @param TruckLength          车长
	 * @param CargoSrcRemark   车源备注
	 * @param TruckSrcRemark   货源备注
	 * @param TruckLength          车长
	 * @param PlateNoType      车牌类型
	 */
	Vue.prototype.getConstItem = function(type) {
		var typeN = ''
		if (type) {
			typeN = type[0].toLowerCase()+type.substring(1,type.length)
			for (let i in this.CONSTLIST[type]) {
				this[typeN+'List'].push({
					"value": this.CONSTLIST[type][i].value,
					"name": this.CONSTLIST[type][i].name
				});
			}
		}else {
			throw new Error('缺少常量类型参数！')
		}
	};
	/**author:Caoanlong *day:2017-08-30
	 * 显示提示消息
	 * @param json 为传入的属性对象
	 */
	Vue.prototype.showMsg = function(json) {
		this.$store.commit({
			type: 'msgContentShow',
			isMsgShow: true,
			MsgContent: json.msg,
		});
		setTimeout(() => {
			this.$store.commit({
	    		type: 'msgContentShow',
	    		isMsgShow: false,
	    		MsgContent: '',
	    	});
		},json.delay)
	}
	/**author:Caoanlong *day:2017-08-31
	 * 通过地址获取经纬度
	 * @param address 代表要转化的地址
	 */
	Vue.prototype.getCoordinate = function(address) {
		var URL = 'http://api.map.baidu.com/geocoder/v2/?ak=AjsVKu7N9iBX2klb9ktqGfAvA5dkfRBs&output=json'+'&address='+encodeURIComponent(address)
		this.$http.jsonp(URL).then(
			(res) => {
				console.log(res.body.result.location)
				return res.body.result.location
			},
			(res) => {
				console.log(res)
				return
			}
		)
	}
	/**author:Caoanlong *day:2017-09-11
	 * 通过经纬度获取地址
	 * @param lat,lng 代表要转化的坐标
	 */
	Vue.prototype.getAddress = function(lat, lng) {
		var URL = 'http://api.map.baidu.com/geocoder/v2/?location='+lat+','+lng+'&output=json&ak=AjsVKu7N9iBX2klb9ktqGfAvA5dkfRBs'
		return new Promise((resolve, reject) => {
			this.$http.jsonp(URL).then((res) => {
				resolve(res.body.result.addressComponent)
			}, res => {
				reject(res.body)
			})
		})
	}
	/**author:Caoanlong *day:2017-08-25
	 * 检查是否登录
	 */
	Vue.prototype.isLogin = function() {
		if (this.MEMBERINFO.mobile) {
			return true
		}else {
			return false
		}
	}
	/**author:Caoanlong *day:2017-08-26
	 * 检查是否认证
	 */
	Vue.prototype.isAuth = function() {
		if (this.MEMBERINFO.certifyStatus == 'Y') {
			return true
		}else {
			return false
		}
	}
	/**author:Caoanlong *day:2017-09-07
	 * 将地区数组对象转为字符串，以逗号分割
	 * @param arr为传入进来的数组
	 */
	Vue.prototype.areaArrToStr = function(arr) {
		var str = ''
		for (let i in arr) {
			if (arr[i].dist.key) {
				str = str + arr[i].dist.key + ((arr.length-1 == i)?'':',')
			}else if (!arr[i].dist.key && arr[i].city.key) {
				str = str + arr[i].city.key + ((arr.length-1 == i)?'':',')
			}else if (!arr[i].dist.key && !arr[i].city.key) {
				str = str + arr[i].province.key + ((arr.length-1 == i)?'':',')
			}
		}
		return str
	};
	/**author:Caoanlong *day:2017-09-07
	 * 将数组对象中的一个属性转为字符串，以逗号分割
	 * @param arr 为传入进来的数组
	 * @param pro 为属性
	 */
	Vue.prototype.arrToStr = function(arr,pro) {
		var str = []
		for (let i in arr) {
			str.push(arr[i][pro])
		}
		return str.join(',')
	}
	/**author:Caoanlong *day:2017-09-09
	 * 从数组中根据code找到对应的name
	 * @param arr 为传入进来的数组
	 * @param pro 为传入进来的key
	 */
	Vue.prototype.arrFindName = function(arr,pro) {
		for (let i in arr) {
			if (arr[i].code == pro) {
				return arr[i].name
			}
		}
	}
}