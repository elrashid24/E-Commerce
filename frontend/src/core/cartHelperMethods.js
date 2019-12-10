import {
    type
} from "os"

export const addProductToCart = (item, next) => {
    if (typeof window !== 'undefined') {
        let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

export const updateItem = (productId, count) => {

    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {

            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count

            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        cart = JSON.parse(localStorage.getItem('cart'))

    }
    cart.map((product, i) => {
        if (product._id === productId) {

            cart.pop(i)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    })
    return cart
}

export const emptyCart = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart")
        next()
    }
}