const router = require('express').Router();
const query = require('./controller');

router.get('/apirequest', query.getQuote);
router.get('/queryuser', query.getUserInfo);
router.get('/querysettings', query.getSettingsInfo);
router.post('/query', query.postUserInfo);
router.post('/query', query.postSettingsInfo);

module.exports = router;
