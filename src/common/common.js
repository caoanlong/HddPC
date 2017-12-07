/**author:Caoanlong *day:2017-08-24
 * 通过class获取元素
 * @param classnames class名
 */
function getElementsClass(classnames){ 
	//定义数组 
	var classobj= new Array();
	//定义数组的下标
	var classint=0; 
	//获取HTML的所有标签
	var tags = document.getElementsByTagName("*");
	//对标签进行遍历 
	for (var i in tags) { 
		//判断节点类型
		if (tags[i].nodeType==1) { 
			//判断和需要CLASS名字相同的，并组成一个数组
			if (tags[i].getAttribute("class") == classnames) {  
				classobj[classint]=tags[i]; 
				classint++; 
			} 
		} 
	}
	//返回组成的数组
	return classobj;
}
/**author:Caoanlong *day:2017-08-24
 * 模拟点击事件
 * @param obj 原生html元素
 */
function trigger(obj) {
	var event = document.createEvent('HTMLEvents');
	event.initEvent("click", true, true);
	obj.dispatchEvent(event);
}
/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
function formDataReq(json) {
	var formData = new FormData();
	for (let attr in json) {
		formData.append(attr,json[attr]);
	};
	return formData;
}

/**author:Caoanlong *day:2017-08-31
 * 去除字符串中的逗号
 * @param string 代表要替换的字符串
 * @param type 代表要替换的符号
 */
function clearComma(string,type) {
	if (string) {
		var items = string.slice(0,string.length-1);
		return items.replace(/,/g,type);
	}else {
		return
	}
}

/**author:Caoanlong *day:2017-08-31
 * 获取元素的style属性值
 * @param obj 代表要获取的元素
 * @param attr 代表要获取的属性
 */
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else{
		return getComputedStyle(obj,false)[attr];
	};
}
/**author:Caoanlong *day:2017-08-31
 * 完美运动框架
 * @param obj 代表要运动的元素
 * @param json 代表要变化的属性
 * @param fnEnd 代表运动之后的回调
 */
function startMove(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;//假设所有的值都已经到了
		for(var attr in json) {
			var curStyle;
			if (attr == 'opacity') {
				curStyle = Math.round(parseFloat(getStyle(obj,attr))*100);
			} else {
				curStyle = parseInt(getStyle(obj,attr));
			};
			var speed = (json[attr] - curStyle)/5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (curStyle != json[attr]) {
				bStop = false;
			};
			if (attr == 'opacity') {
				obj.filter = 'alpha(opacity:' + (curStyle + speed) + ')';
				obj.style[attr] = (curStyle + speed)/100;
			} else {
				obj.style[attr] = curStyle + speed + 'px';
			};
		}
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) {
				fnEnd();
			};
		};
	},30);
};
export default {
	getElementsClass,
	trigger,
	formDataReq,
	clearComma,
	getStyle,
	startMove,
} 