const {
    Order,
    CartItem
} = require('../models/order')

exports.create = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, response) => {
        if (error) {
            return res.status(400).json({
                error: 'something fucked up in the order controller-couldnt save it to the DB'
            })
        } else {
            return res.json(response)
        }
    })

}