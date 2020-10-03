import config from './config'

// TODO: refactor and integrate with react-query

const BASE_URL = config.RbServerBase + config.RbServerPort;

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
  return fetchRequest('/adddailydata', {
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

function postHistoricalData (body) {
  return fetchRequest('/addhistoricaldata', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

function updateHistoricalData (body) {

}

export default {
  getQuote,
  postDailyData,
  getUserInfo,
  postHistoricalData,
  updateHistoricalData,
}