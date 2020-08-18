// 中间件

const { normalize } = require('path')
const { parse, format } = require('url')

module.exports = function urlnormalizeMiddleware () {
  return (req, res, next) => {
    const pathname = normalize(req.path).split('\\').join('/')
    const urlParsed = parse(req.url)

    if (req.path != pathname) {
      urlParsed.pathname = pathname
      res.redirect(format(urlParsed))
    } else {
      next()
    }
  }
}