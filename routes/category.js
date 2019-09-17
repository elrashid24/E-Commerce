const express = require('express')
const router = express.Router()
const {
    userById
} = require('../controllers/user')
const {
    create
} = require('../controllers/category')

const {
    requireSignIn,
    isAdmin,
    isAuth
} = require("../controllers/auth")

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create)

router.param('userId', userById)

module.exports = router