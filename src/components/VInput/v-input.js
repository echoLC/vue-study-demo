import { FORM_FIELD_CHANGE_EVENT_NAME } from '../constants'

/* mixins */
import event from '@/mixins/event'

export default {
  name: 'VInput',

  inheritAttrs: false,

  props: {
    value: null,

    type: {
      type: String,
      default: 'text'
    }
  },

  mixins: [event],

  data () {
    return {
      key: ''
    }
  },

  methods: {
    inputEventHandler (e) {
      this.$emit('input', e.target.value)
      this.notify('VFormItem', FORM_FIELD_CHANGE_EVENT_NAME)
    }
  },

  render () {
    const { inputEventHandler, $attrs, value, type } = this
    return (
      <input
        class="v-input"
        value={value}
        type={type}
        autocomplete="off"
        on-input={inputEventHandler}
        domProps={$attrs} />
    )
  }
}
