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
		//TODO: compare aud from the payload === client_ID
		const payload = ticket.getPayload();
		const userEmail = payload['email'];
		const userId = payload.sub;
		
		const user = await db.User.findOne({
			where: { email: `${userEmail}`}})
			if (!user) throw new Error ('User not found WTF YOU STUPID HACKER HA... HA... HA...');
			const accessToken = jwt.sign({ id: user.id }, JWT_KEY);
      res.status(200).send({ accessToken });
	} catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
}

module.exports = {
	googleVerify,
}