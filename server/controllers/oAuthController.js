const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID); 
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const db = require('../models/index');
require('dotenv').config();

async function googleVerify(req, res) {
	try {
		const { idToken } = req.body;
		const ticket = await client.verifyIdToken({
				idToken: idToken,
				audience: process.env.IOS_CLIENT_ID,
		});
		//TODO: additional security measure - compare aud from the payload === client_ID
		const payload = ticket.getPayload();
		console.log('payload:', payload)
		const userId = payload.sub;
		
		let user = await db.User.findOne({
			where: { id: `${userId}`}})
			if (!user) {
			const { email, given_name, family_name } = payload
			user = await db.User.create({
				id: userId,
				email,
				firstName: given_name,
				lastName: family_name
			})
		} 
		const accessToken = jwt.sign({ id: user.id }, JWT_KEY);
    res.status(200).send({ accessToken });
	} catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Error logging in' });
  }
}

module.exports = {
	googleVerify,
}