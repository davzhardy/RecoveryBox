const User = require('./models/user');
const Settings = require('./models/user');
const FullData = require('./models/fullData');
const fetch = require('node-fetch');
const db = require('./models/index');


async function getQuote (req, res) {
  try {
    const QUOTE_URL = 'https://zenquotes.io/api/random'
    let quote = await fetch(QUOTE_URL).then(apiRes => apiRes.json())
    res.status(200);
    res.send(quote);
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}


async function getUserInfo (req, res) {
  try {
    console.log(req)
    const query = 'test';
    const user = await db.User.findAll({ where: { id: `${query}`}})
    res.status(200);
    res.send(user);
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function postUserInfo (req, res) {}

async function getSettingsInfo () {}

async function postSettingsInfo () {}

module.exports = {
  getQuote,
  getUserInfo,
  getSettingsInfo,
  postUserInfo,
  postSettingsInfo,
};