const {OAuth2Client} = require('google-auth-library');
require('dotenv').config();
const client = new OAuth2Client(process.env.CLIENT_ID); 


async function googleVerify(req, res) {

	console.log('req:', req.body)
	const { idToken } = req.body; //REL WHY IS NOT DEFINED?
  const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: '47709316996-ph0bh64seqcv93le2tsasetmvb9enoc9.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  console.log('payload:', payload)
  const userid = payload['sub'];
  console.log('userid:', userid)
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}


module.exports = {
	googleVerify,
}