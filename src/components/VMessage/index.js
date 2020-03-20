import VMessage from './message'
import Vue from 'vue'

const MessageProxyConstructor = Vue.extend({
  components: {
    VMessage
  },

  render () {
    // 将 $options.options 传入 Message 组件，使用 props 验证数据
    const { options: props } = this.$options
    return (
      <v-message { ...{ props } } ref="message"></v-message>
    )
  },

  computed: {
    target () {
      return this.$refs.message
    }
  }
})

// 当前弹窗实例
let currentProxyInstance
// 弹窗id
let messageId = 1
// 弹窗层级
let zIndex = 1000
// 所有弹窗实例
const activeMessageQueue = []


function Message (options) {
  // 如果是服务端渲染则直接返回
  if (Vue.prototype.$isServer) return

  const id = `v-Message--${messageId++}`
  options.id = id
  options.zIndex = zIndex++

  currentProxyInstance = new MessageProxyConstructor({
    options
  })

  currentProxyInstance.$mount()
  document.body.appendChild(currentProxyInstance.$el)

  currentProxyInstance.target.show()

  // promise化
  const promise = new Promise((resolve, reject) => {
    activeMessageQueue.push({
      instance: currentProxyInstance,
      resolve
    })
  })

  return {
    close: currentProxyInstance.target.close,
    then: fn => promise.then(fn)
  }
}

/**
 * @description 关闭页面上所有 Message 实例
 */
Message.closeAll = function () {
  const len = activeMessageQueue.length
  for (let i = len - 1; i >= 0; i--) {
    // 调用实例中的关闭方法
    activeMessageQueue[i].instance.target.close()
  }
}

/**
 * inject Vue plugin
 */
Message.install = function (Vue) {
  console.log(123)
  Vue.prototype.$message = Message
}

export default Message

