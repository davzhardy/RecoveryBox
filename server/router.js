const router = require('express').Router();
const query = require('./controller');

router.get('/apirequest', query.getQuote);
router.get('/user/:username', query.getUserInfo);
router.get('/data/:id', query.getAllData);
router.post('/adduser', query.postUserInfo);
router.post('/adddailydata', query.postDailyData);
router.post('/addhistoricaldata', query.postHistoricalData);


//TODO do these routes
router.put('/addsettings', query.postSettingsInfo);
router.get('/querysettings', query.getSettingsInfo);

module.exports = router;
