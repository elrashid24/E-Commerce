export const getProducts = (sortBy) => {
    return fetch(`http://localhost:8000/products`, {
        method: 'GET'
    }).then(products => {
        return products.json()
    }).catch(error => (error))
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`http://localhost:8000/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json()
    }).catch(error => (error))
}
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`http://localhost:8000/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product,
    }).then(response => {
        return response.json()
    }).catch(error => (error))
}