import queryString from 'query-string'

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
        .catch(err => console.log(err));
};

export const list = params => {
    const searchParams = queryString.stringify(params)
    return fetch(`http://localhost:8000/products/search?${searchParams}`, {
        method: 'GET'
    }).then(result => {
        return result.json()
    }).catch(error => console.log(error))
}