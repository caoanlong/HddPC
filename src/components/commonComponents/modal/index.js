import modalComponent from './modalComponent'

let $modal
export default function install(Vue, options) {
	Vue.prototype.modal = function(params) {	
		const Modal = Vue.extend(modalComponent)
		if (!$modal) {
			$modal = new Modal({
				el: document.createElement('div'),
			})
			document.body.appendChild($modal.$el)
		}
		document.body.style.position = 'fixed'
		$modal.isShow = true
		if (typeof params == 'string') {
			$modal.content = params
		}else {
			$modal.width = params['width']
			$modal.title = params['title']
			$modal.content = params['content']
			$modal.icon = params['icon']
			$modal.sure = params['sure']
			$modal.cancel = params['cancel']
			if (params['btn']) {
				$modal.btn = params['btn']
			}
		}
	}
}