import '@/scss/components/message.scss'

export default {
  name: 'VMessage',

  props: {
    title: String,

    message: String,

    duration: {
      type: Number,
      default: 2000
    },

    zIndex: Number
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    show () {
      this.visible = true

      setTimeout(() => {
        this.close()
      }, this.duration)
    },

    close () {
      this.visible = false
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    }
  },

  render () {
    return (
      <div class="v-Message" v-show={this.visible}>
        <div class="v-Message-title">{ this.title }</div>
        <div class="v-Message-conetnt">{ this.message }</div>
      </div>
    )
  }
}