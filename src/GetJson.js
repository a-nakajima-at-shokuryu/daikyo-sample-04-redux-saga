// httpモジュールを読み込む
const http = require('http')
const url = require('url')

// Webサーバを実行
const svr = http.createServer()
svr.on('request', handler)
svr.listen(8080)  // 8080ポートで待ち受け開始

// サーバにアクセスがあった時の処理
function handler (req, res) {

  // パスを取得
  const path = url.parse(req.url)
  switch (path.pathname) {
    case '/busho':
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
      res.write(JSON.stringify([
        { id: '10', name: '営業所Ａ', }, 
        { id: '20', name: '営業所Ｂ', }, 
        { id: '30', name: '営業所Ｃ', }, 
        { id: '40', name: '営業所Ｄ', }, 
        { id: '50', name: '営業所Ｅ', }, 
        { id: '60', name: '営業所Ｆ', }, 
      ]))
      res.end()
      break
    default:
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.write('')
      res.end()
      break
  }

}
