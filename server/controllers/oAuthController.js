require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID); 
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const db = require('../models/index');

async function googleVerify(req, res) {
	try {
		console.log('req:', req.body)
		const { idToken } = req.body; //REL WHY IS NOT DEFINED?
		const ticket = await client.verifyIdToken({
				idToken: idToken,
				audience: process.env.IOS_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		console.log('payload:', payload)
		const userEmail = payload['email'];
		//Lookup the user using the info we have
		
		const user = await db.User.findAll({
			where: { email: `${userEmail}`}})
		console.log(' ---> user', user);
			const accessToken = jwt.sign({ id: user.id }, JWT_KEY);
			res.status(200).send({ accessToken });
	} catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
	//TODO: compare aud from the payload === client_ID
}


module.exports = {
	googleVerify,
}