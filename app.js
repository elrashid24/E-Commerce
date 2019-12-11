require('dotenv').config()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const experessValidator = require('express-validator')
const cors = require('cors')
app.use(cors())



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => (console.log("Connected to MonogoDB")), err => (err))


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(experessValidator())

app.use(authRoutes)
app.use(userRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(braintreeRoutes)
app.use(orderRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    (console.log(`Server is listenitng on ${port}`))
})