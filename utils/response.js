
class Response {
  static success(res, code = 200, message = "success", data = "done") {
    res.status(code).json({ message, data, code })
  }
  static error(res, code = 500, message = "error", data = "failed") {
    res.status(code).json({ message, data, code })
  }
}

module.exports = {
  Response
}
