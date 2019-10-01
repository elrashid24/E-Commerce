const express = require('express')
const router = express.Router()
const {
    userById
} = require('../controllers/user')
const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require('../controllers/product')

const {
    requireSignIn,
    isAdmin,
    isAuth
} = require("../controllers/auth")

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get('/product/photo/:productId', photo)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router