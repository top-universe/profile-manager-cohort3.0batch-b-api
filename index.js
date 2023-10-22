require("dotenv").config()

// import globals
require('./utils/globals')

const express = require("express")
const app = express()

app.use(express.json())

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const PORT = process.env.PORT || 3000

// import our packages
const auth = require('./packages/user/route')
app.use(auth)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  log(`We are live on port ${PORT}🚀`)
})
