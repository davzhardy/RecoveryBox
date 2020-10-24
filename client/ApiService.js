import config from './config/api/config'

const BASE_URL = config.RbServerBase + config.RbServerPort;

function fetchRequest (path, options) {
  return fetch(BASE_URL + path, options)
    .then(res => res.status < 400 ? res.json() : Promise.reject(res))
    .catch((err) => {
      console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
    })
};

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

function getUserInfo (userId, accessToken) {
  return fetchRequest(`/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  })  
  .catch((err) => console.log(err));
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

function getJwt (idToken) {
  return fetchRequest ('/auth/google', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(idToken)
  })
}

export default {
  getQuote,
  postDailyData,
  getUserInfo,
  postHistoricalData,
  updateHistoricalData,
  getJwt
}