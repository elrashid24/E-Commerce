export const addProductToCart = (item, next) => {
    console.log('FUCK ME', item)
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item,
            count: 1
        })
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            console.group('big cart', cart)
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}