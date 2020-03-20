import arrayFrom from '@/utils/arrayFrom'

function broadcast (name, eventName, payload) {
  this.$chilren && this.$chilren.forEach(child => {
    const childName = child.$options.name
    if (childName === name) {
      child.$emit.apply(child, [eventName].concat(payload))
    } else {
      broadcast.apply(child, arrayFrom(arguments))
    }
  })
}

export default {
  methods: {
    /* 根据 name 向特定子组件广播发布特定事件 */
    broadcast (name, eventName, payload) {
      broadcast.apply(this, arrayFrom(arguments))
    },
    /* 根据 name 通知父组件发布特定事件 */
    notify (name, eventName, payload) {
      let parent = this.$parent
      let parentName = parent.$options.name

      while (parent && parentName !== name) {
        parent = parent.$parent

        if (parent) {
          parentName = parent.name
        }
      }

      parent && parent.$emit.apply(parent, [eventName].concat(payload))
    }
  }
}
