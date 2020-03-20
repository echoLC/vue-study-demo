import VForm from './v-form'
import VFormItem from './v-form-item'
import '@/scss/components/form.scss'

VForm.Item = VFormItem

VForm.install = function (Vue) {
  Vue.component(VForm.name, VForm)
}

VFormItem.install = function (Vue) {
  Vue.component(VFormItem.name, VFormItem)
}

export default VForm
