const router = require('express').Router();
const query = require('./controller');

router.get('/apirequest', query.getQuote);
router.get('/queryuser', query.getUserInfo);
router.get('/querysettings', query.getSettingsInfo);
router.post('/adduser', query.postUserInfo);
router.post('/query', query.postSettingsInfo);
router.post('/adddata', query.postData);
router.post('/test', query.Test);

module.exports = router;
