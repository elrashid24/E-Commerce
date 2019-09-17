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