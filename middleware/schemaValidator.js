const { validator } = require('../utils/validator.js')

exports.schemaValidator = (schema) => {
  return (req, res, next) => {
    try {
      let validate = validator(schema, req.body)
      next()
    } catch (err) {
      Response.error(res, 500, "middleware error", err.message)
    }
  }
}
