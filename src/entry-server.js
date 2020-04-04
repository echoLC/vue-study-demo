import { createApp } from './main'

export default function serverEntry (context) {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 导航到首屏
    router.push(context.url)

    router.onReady(() => {
      // 获取当前匹配的组件
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        reject(new Error('404'))
      }

      const matchedComponentsPromiseArr = matchedComponents.map(component => {
        const asyncData = component.asyncData

        if (asyncData) {
          return asyncData({
            store,
            route: router.currentRoute
          })
        }
      })
      Promise.all(matchedComponentsPromiseArr).then(() => {
        // 获取所有数据结果之后，将这些数据存入store
        // 将这些状态指定给上下文，将来bundleRenderer在渲染的时候
        // 会将这些值附加到window.__INITIAL_STATE__
        context.state = store.state
        resolve(app)
      })
    }, reject)
  })
}
