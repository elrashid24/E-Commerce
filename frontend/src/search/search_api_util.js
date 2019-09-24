export const getCategories = () => {
    return fetch('http://localhost:8000/categories', {
        method: 'GET',
    }).then(categories => {
        return categories.json()
    }).catch(error => console.log(error))
}