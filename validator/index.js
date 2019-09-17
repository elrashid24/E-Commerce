exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name field cannot be blank.").notEmpty()
    req.check('email', "Email field must be between 3 and 32 characters long.")
        .isLength({
            min: 4,
            max: 32
        })
    req.check("password", "Password field is required.").notEmpty()
    req.check("password")
        .isLength({
            min: 6
        })
        .withMessage("Passwords must be at least 6 characters long")
    const errors = req.validationErrors()
    if (errors) {
        const fristError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: fristError
        })
    }
    next()
}