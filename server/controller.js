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

async function postData (req, res) {
  const data = req.body
  try {
    const newData = await db.Data.create({

    })
  } catch {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function Test (req, res) {
  console.log('recieved')
  res.sendStatus(201)
}

async function postUserInfo (req, res) {
  const user = req.body
  try {
    const newUser = await db.User.create({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      registrationDate: user.registrationDate,
    })
    res.status(201).send(JSON.stringify(newUser))
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function getSettingsInfo () {}

async function postSettingsInfo () {}

module.exports = {
  getQuote,
  getUserInfo,
  getSettingsInfo,
  postUserInfo,
  postSettingsInfo,
  postData,
  Test
};