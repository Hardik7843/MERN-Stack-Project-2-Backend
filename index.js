const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const app = express()
app.use(bodyParser.json())
app.use(cors())

require('./Models/db')
const UserModel = require('./Models/User')
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})