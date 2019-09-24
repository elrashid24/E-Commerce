const Category = require('../models/Category')
const {
    errorHandler
} = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: 'Category Could not be created. Categories must be unique and at least character in length'
            })
        }
        res.json({
            data
        })
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "No products found under that category."
            })
        }
        req.category = category
        next()
    })

}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res) => {
    let category = req.category
    category.name = req.body.name
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(updatedCategory)
    })
}

exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Cateogry could not be deleted"
            })
        }
        return res.json({
            message: "This category was successfully delted!"
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, allCategories) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(allCategories)
    })
}