const router = require('express').Router();
const query = require('./controllers/queryController');
const oAuth = require('./controllers/oAuthController');

router.get('/apirequest', query.getQuote);
router.get('/user/:username', query.getUserInfo);
router.get('/data/:id', query.getAllData);
router.post('/adduser', query.postUserInfo);
router.post('/adddailydata', query.postDailyData);
router.post('/addhistoricaldata', query.postHistoricalData);

router.post('/auth/google', oAuth.googleVerify);

//TODO do these routes
router.put('/addsettings', query.postSettingsInfo);
router.get('/querysettings', query.getSettingsInfo);

module.exports = router;
