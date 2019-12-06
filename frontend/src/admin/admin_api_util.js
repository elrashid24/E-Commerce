  export const createCategory = (userId, token, category) => {
      return fetch(`http://localhost:8000/category/create/${userId}`, {
              method: `POST`,
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(category)
          })
          .then(response => {
              return response.json();
          })
          .catch(err => (err));
  };
  export const createProduct = (userId, token, product) => {
      return fetch(`http://localhost:8000/product/create/${userId}`, {
              method: `POST`,
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`

              },
              body: product
          })
          .then(response => {
              return response.json();
          })
          .catch(err => (err));
  };