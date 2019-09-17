require('dotenv').config()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const experessValidator = require('express-validator')



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("Connected to MonogoDB"))


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(experessValidator())


app.use(authRoutes)
app.use(userRoutes)
app.use(categoryRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listenitng on ${port}`)
})