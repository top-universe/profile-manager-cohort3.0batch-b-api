const auth = require('express').Router()
// import middlewares
const { schemaValidator } = require('../../middleware/schemaValidator.js')

// import controllers
const { login, signup, verifyAccount } = require('./controller.js')

// import schema
const { userSchema } = require('./schema.js')

// signup
auth.post("/signup", schemaValidator(userSchema), signup)

// login
auth.post("/login", schemaValidator(userSchema), login)

// verify account
auth.get("/verify/:token", verifyAccount)

module.exports = auth
