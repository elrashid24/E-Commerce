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
        let product = new Product(fields)
        if (files.photo) {
            //this should match the name of what's being sent from the client side (photo vs image vs picture etc)
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })
}