const Product = require('../models/Product')
const formidable = require('formidable')
const {
    errorHandler
} = require('../helpers/dbErrorHandler')
const fs = require('fs')
//file system
const _ = require('lodash')
exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All products must contain a name, description, price, category, quantity, and any relevant shipping information"
            })
        }
        let product = new Product(fields)
        if (files.photo) {
            //this should match the name of what's being sent from the client side (photo vs image vs picture etc)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Pictures must be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}