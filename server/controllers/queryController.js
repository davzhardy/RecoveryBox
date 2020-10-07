const fetch = require('node-fetch');
const db = require('../models/index');

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

//RELL this functions getUserInfo and getAllData does the same thing?
async function getUserInfo (req, res) {
    try {
      const user = req.user;
      res.status(201).send(user)
  } catch (e) {
    console.log('Resource not found', e); // eslint-disable-line no-console
    res.sendStatus(404);
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

async function postDailyData (req, res) {
  const data = req.body
  try {
    const date = data.date
    const UserId = data.UserId
    const dataCheck = await db.Data.findAll({
      where: { 
        date: `${date}`,
        UserId: `${UserId}`
      }
    });
    if (dataCheck.length) {
      const newData = await db.Data.update({
        date: data.date,
        meetings: data.meetings,
        feeling: data.feeling,
        moods: data.moods,
        suggestions: data.suggestions,
        UserId: data.UserId
      },
      {where: { 
          date: `${date}`,
          UserId: `${UserId}`
        },
      });
      res.status(201).send(newData);
    } else {
      const newData = await db.Data.create({
        date: data.date,
        meetings: data.meetings,
        feeling: data.feeling,
        moods: data.moods,
        suggestions: data.suggestions,
        UserId: data.UserId
      });
      res.status(201).send(newData);
    }
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

// RELL ther is no check in 
async function postUserInfo (req, res) {
  //TODO add ability to reject request if username already taken
  const user = req.body
  try {
    //REL: change this to reflect new DB schema
    const newUser = await db.User.create({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    res.status(201).send(newUser)
  } catch (e) {
    console.log('Error', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

//RELL This postHistoricalData looks equal like postDailyData why? 
async function postHistoricalData (req, res) {
  const data = req.body
  try {
    const date = data.date
    const UserId = data.UserId
    const dataCheck = await db.Data.findAll({
      where: { 
        date: `${date}`,
        UserId: `${UserId}`
      }
    });
    if (dataCheck.length) {
      const newData = await db.Data.update({
        date: data.date,
        meetings: data.meetings,
        feeling: data.feeling,
        moods: data.moods,
        suggestions: data.suggestions,
        UserId: data.UserId
      },
      {where: { 
          date: `${date}`,
          UserId: `${UserId}`
        },
      });
      res.status(201).send(newData);
    } else {
      const newData = await db.Data.create({
        date: data.date,
        meetings: data.meetings,
        feeling: data.feeling,
        moods: data.moods,
        suggestions: data.suggestions,
        UserId: data.UserId
      });
      res.status(201).send(newData);
    }
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
  postDailyData,
  postHistoricalData,
};