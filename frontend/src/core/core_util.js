import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`http://localhost:8000/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then(categories => {
        return categories.json()
    }).catch(error => (error))
}

export const getCategories = () => {
    return fetch('http://localhost:8000/categories', {
        method: 'GET',
    }).then(categories => {
        return categories.json()
    }).catch(error => (error))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`http://localhost:8000/products/by/search`, {
            method: `POST`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => (err));
};

export const list = params => {
    const searchParams = queryString.stringify(params)
    return fetch(`http://localhost:8000/products/search?${searchParams}`, {
        method: 'GET'
    }).then(result => {
        return result.json()
    }).catch(error => (error))
}

export const getSingleProduct = productId => {
    return fetch(`http://localhost:8000/product/${productId}`, {
        method: `GET`,

    }).then(product => {
        return product.json()
    }).catch(error => (error))
}

export const listRelatedProducts = productId => {
    return fetch(`http://localhost:8000/products/related/${productId}`, {
        method: `GET`,

    }).then(products => {
        return products.json()
    }).catch(error => (error))
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`http://localhost:8000/braintree/getToken/${userId}`, {
        method: `GET`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    }).then(token => {
        return token.json()
    }).catch(error => console.log(error))
}

export const processPayment = (userId, token, paymentDataFromClient) => {
    return fetch(`http://localhost:8000/braintree/payment/${userId}`, {
        method: `POST`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentDataFromClient)

    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`http://localhost:8000/order/create/${userId}`, {
        method: `POST`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            order: createOrderData
        })

    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}