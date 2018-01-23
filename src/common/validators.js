import { withParams, req, regex } from 'vuelidate/lib/validators/common'

/* 手机号 */
export const mobile = withParams({type: 'mobile'}, value => {
	let expr = /^1[34578]\d{9}$/
	return !req(value) || expr.test(value)
})

/* 短信验证码 */
export const verCode = regex('verCode', /^\d{6}$/)

/* 正整数 */
export const numberUse = withParams({type: 'numberUse'}, value => {
	let expr = /^[1-9]\d*$/
	return !req(value) || expr.test(value)
})

