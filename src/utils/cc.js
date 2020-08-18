module.exports = function callbackCatch (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}