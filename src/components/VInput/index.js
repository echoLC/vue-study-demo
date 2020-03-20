import VInput from './v-input'
import '@/scss/components/input.scss'

VInput.install = function (Vue) {
  Vue.component(VInput.name, VInput)
}

export default VInput
