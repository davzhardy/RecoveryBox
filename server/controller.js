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
    const username = req.params.username
    const user = await db.User.findAll({
       where: { username: `${username}`},
      include: db.Data})
    res.status(200);
    res.send(user);
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function getAllData (req, res) {
  try {
    const userId = req.params.id
    const data = await db.Data.findAll({ where: { UserId: `${userId}`}})
    res.status(200);
    res.send(data);
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function postData (req, res) {
  const data = req.body
  try {
    const newData = await db.Data.create({
      date: data.date,
      meetings: data.meetings,
      feeling: data.feeling,
      moods: data.moods,
      suggestions: data.suggestions,
      UserId: data.UserId
    })
    res.status(201).send(newData)
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function postUserInfo (req, res) {
  //TODO add ability to reject request if username already taken
  const user = req.body
  try {
    const newUser = await db.User.create({
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      registrationDate: user.registrationDate,
    })
    res.status(201).send(newUser)
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
  getAllData,
  getSettingsInfo,
  postUserInfo,
  postSettingsInfo,
  postData,
};