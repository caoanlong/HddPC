import Vue from 'vue';
/**author:Caoanlong *day:2017-08-29
 * 消除字符串中的逗号，并转化为“-”
 * @param value为对应的字符串
 */
var clearComma = Vue.filter('clearComma',(value) => {
	if (value) {
		var items = value.slice(0,value.length-1);
		return items.replace(/,/g,'-');
	}else {
		return
	}
});
export default {
	clearComma
}