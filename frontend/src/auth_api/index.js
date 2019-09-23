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

  export const signOut = (next) => {
      if (typeof window !== 'undefined') {
          localStorage.removeItem('jwt')
          next()
          //next = redirect user
          return fetch(`http://localhost:8000/signout`, {
              method: 'GET',
          }).then(res => console.log('signout ', res)).catch(err => console.log('error ',
              err))
      }
  }

  export const isAuthenticated = (next) => {
      if (typeof window === 'undefined') {
          return false
      }
      if (localStorage.getItem('jwt')) {
          return JSON.parse(localStorage.getItem('jwt'))
      } else {
          return false
      }
  }