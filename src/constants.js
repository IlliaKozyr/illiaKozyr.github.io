export const backURL = 'http://chat.ed.asmer.org.ua/'

export function fetchGraphQL(query) {
    return fetch('https://cors-anywhere.herokuapp.com/http://chat.ed.asmer.org.ua/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://facogram.netlify.app'
      },
      body: JSON.stringify({
        query: query
      })
    })
    .then(response => response.json())
    .then(data => {
      // обработка данных
      return data;
    })
    .catch(error => {
      // обработка ошибки
      console.error(error);
    });
  }
  
//   // Пример использования функции fetchGraphQL для запроса данных
//   const query = `
//     query {
//       users {
//         id
//         name
//       }
//     }
//   `;
  
//   fetchGraphQL(query)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));