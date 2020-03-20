/* utils */
import getCssLenUnit from '@/utils/getCssLenUnit'
import AsyncValidator from 'async-validator'

/* mixins */
import event from '@/mixins/event'

/* consatnts */
import { ADD_FORM__ITEM_EVENT_NAME, REMOVE_FORM__ITEM_EVENT_NAME, FORM_FIELD_CHANGE_EVENT_NAME } from '../constants'

export default {
  name: 'VFormItem',

  inject: ['form'],

  props: {
    label: String,

    prop: String
  },

  mixins: [event],

  data () {
    return {
      errorTip: ''
    }
  },

  computed: {
    labelWidthStyle () {
      return {
        width: getCssLenUnit('width', this.form.labelWidth)
      }
    }
  },

  mounted () {
    this.notify('VForm', ADD_FORM__ITEM_EVENT_NAME, [this])

    this.$on(FORM_FIELD_CHANGE_EVENT_NAME, () => {
      console.log(123)
      this.validate()
    })
  },

  beforeDestroy () {
    this.notify('VForm', REMOVE_FORM__ITEM_EVENT_NAME, [this])
  },

  methods: {
    validate () {
      if (!this.prop) {
        return Promise.resolve()
      }
      const rules = this.form.rules[this.prop]

      if (!rules || !rules.length) return Promise.resolve()

      const source = {
        [this.prop]: this.form.model[this.prop]
      }
      console.log(source)

      const validator = new AsyncValidator({ [this.prop]: rules })
      return new Promise((resolve, reject) => {
        validator.validate(source, { firstFields: true }).then(() => {
          this.clearErrorTip()
          return resolve()
        }).catch(({ errors }) => {
          this.errorTip = errors && errors[0].message
          const ret = {
            [this.prop]: this.errorTip
          }
          return reject(ret)
        })
      })
    },

    clearErrorTip () {
      this.errorTip = null
    },

    renderLabel () {
      if (this.label) {
        return (
          <label class="vForm-item__label" style={this.labelWidthStyle}>{ this.label }：</label>
        )
      }
    },

    renderErrorTip () {
      if (this.errorTip) {
        return (
          <div class="vForm-item__error">{ this.errorTip }</div>
        )
      }
    }
  },

  render () {
    return (
      <div class="vForm-item">
        <div class="vForm-item__content">
          { this.renderLabel() }
          { this.$slots.default }
        </div>
        {this.renderErrorTip() }
      </div>
    )
  }
}
