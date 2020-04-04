const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

// 挂在build后的静态目录 dist/client
app.use(express.static(resolve('../dist/client'), { index: false }))

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const template = fs.readFileSync(resolve('../public/index.html'), 'utf-8')
const clientManifest = require(resolve('../dist/client/vue-ssr-client-manifest.json'))
const render = createBundleRenderer(bundle, {
  runInNewContext: false,
  clientManifest,
  template
})

app.get('*', async (req, res) => {
  try {
    const html = await render.renderToString({
      url: req.url,
      title: 'Vue SSR'
    })
    res.send(html)
  } catch (err) { 
    res.status(500).send('服务器渲染错误，请重试！')
  }
})

app.listen(3000)