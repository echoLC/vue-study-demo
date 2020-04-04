import { createApp } from './main'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 路由就绪事件，执行挂载
router.onReady(() => {
  app.$mount('#app')
})
