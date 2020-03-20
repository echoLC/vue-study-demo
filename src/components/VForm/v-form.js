import { ADD_FORM__ITEM_EVENT_NAME, REMOVE_FORM__ITEM_EVENT_NAME } from '../constants'

export default {
  name: 'VForm',

  props: {
    model: {
      type: Object,
      required: true
    },

    rules: {
      type: Object,
      default: () => ({})
    },

    labelWidth: {
      type: [Number, String],
      default: 60
    }
  },

  provide () {
    return {
      form: this
    }
  },

  data () {
    return {
      formItemInstances: []
    }
  },

  created () {
    this.$on(ADD_FORM__ITEM_EVENT_NAME, (formItemCom) => {
      this.formItemInstances.push(formItemCom)
    })

    this.$on(REMOVE_FORM__ITEM_EVENT_NAME, (currentFormItemCom) => {
      this.formItemInstances = this.formItemInstances.filter(formItemCom => currentFormItemCom !== formItemCom)
    })
  },

  methods: {
    validate (cb) {
      const promiseTasks = this.formItemInstances.map(formItemCom => formItemCom.validate())
      Promise.all(promiseTasks)
      .then(() => cb(true))
      .catch(() => cb(false))
    }
  },

  render () {
    return (
      <div class="vForm">
        { this.$slots.default }
      </div>
    )
  }
}
