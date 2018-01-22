import msgComponent from './msgComponent'
import objectAssign from 'object-assign'

function deepObjectAssign ($vm, options) {
	console.log($vm)
	const defaultPro = {}
	for (let i in $vm.$options.props) {
		if (i != 'value') {
			defaultPro[i] = $vm.$options.props[i].default
		}
	}
	const _option = objectAssign({}, defaultPro, options)
	for (let i in _option) {
		$vm[i] = _option[i]
	}
}

let $msg

export default function install(Vue, options) {
	const Msg = Vue.extend(msgComponent)
	if (!$msg) {
		$msg = new Msg({
			el: document.createElement('div'),
		})
		document.body.appendChild($msg.$el)
	}
	const msg  = {
		show (options) {
			if (typeof options === 'string') {
				$msg.content = options
			} else if (typeof options === 'object') {
				deepObjectAssign($msg, options)
			}
			$msg.isShow = true
		},
		hide () {
			$msg.isShow = false
		}
	}
	Vue.prototype.msg = msg
}