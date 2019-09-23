  export const signUp = user => {
      return fetch(`http://localhost:8000/signup`, {
              method: `POST`,
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(user)
          })
          .then(response => {
              return response.json();
          })
          .catch(err => console.log(err));
  };

  export const signIn = user => {
      return fetch(`http://localhost:8000/signin`, {
              method: `POST`,
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(user)
          })
          .then(response => {
              return response.json();
          })
          .catch(err => console.log(err));
  };

  export const authenticate = (data, next) => {
      if (typeof window !== 'undefined') {
          localStorage.setItem('jwt', JSON.stringify(data))
          next()
      }
  }