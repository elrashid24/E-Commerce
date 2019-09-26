export const getProducts = (sortBy) => {
    return fetch(`http://localhost:8000/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then(categories => {
        return categories.json()
    }).catch(error => console.log(error))
}

export const getCategories = () => {
    return fetch('http://localhost:8000/categories', {
        method: 'GET',
    }).then(categories => {
        return categories.json()
    }).catch(error => console.log(error))
}