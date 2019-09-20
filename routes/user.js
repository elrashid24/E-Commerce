const express = require('express')
const router = express.Router()

const {
    requireSignIn,
    isAdmin,
    isAuth
} = require("../controllers/auth")

const {
    userById,
    read,
    update
} = require('../controllers/user')


router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    return res.json({
        user: req.profile
    })
})
router.get('/user/:userId', requireSignIn, isAuth, isAdmin, read)
router.put('/user/:userId', requireSignIn, isAuth, isAdmin, update)

router.param('userId', userById)

module.exports = router