import { useQuery } from "react-query";

// TODO: refactor and integrate with react-query

const BASE_URL = 'http://192.168.1.244:3001'

function fetchRequest (path, options) {
  return fetch(BASE_URL + path, options)
    .then(res => res.status < 400 ? res.json() : Promise.reject(res))
    .catch((err) => {
      console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
    })
};

// function fetchRequest () {
//   return useQuery("getQuotes", async () => {
//     const { data } = await axios.get(QUOTE_URL, options);
//     return data;
//   });
// }

function getQuote () {
  return fetchRequest('/apirequest')
}

function postDailyData (body) {
  return fetchRequest('/adddata', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

function getUserInfo (username) {
  return fetchRequest(`/user/${username}`, {
    method: 'GET',
  })
}

export default {
  getQuote,
  postDailyData,
  getUserInfo,
}