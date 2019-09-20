const User = require('../models/User')
const {
    requireSignIn
} = require("../routes/auth")

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "This user does not exist"
            })
        }
        req.profile = user;
        next()
    })
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.json(req.profile)
}

exports.update = (req, res) => {
    User.findOneAndUpdate({
            _id: req.profile._id
        }, {
            $set: req.body
        }, {
            new: true
        },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Unauthorized Activity."
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            return res.json(user)
        })
}