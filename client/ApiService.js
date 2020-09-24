import axios from "axios";
import { useQuery } from "react-query";

const QUOTE_URL = 'https://zenquotes.io/api/random'

// function fetchRequest (path, options) {
//   return fetch(BASE_URL + path, options)
//     .then(res => res.status < 400 ? res.json() : Promise.reject(res))
//     .catch((err) => {
//       console.log('Error:', err) //eslint-disable-line no-console
//     })
// };

function fetchQuote () {
  return useQuery("getQuotes", async () => {
    const { data } = await axios.get(QUOTE_URL, {
      headers: {
      },
    });
    return data;
  });
}

export default {
  fetchQuote
}