const jwt = require('jsonwebtoken');
const db = require('../models/index');
const JWT_KEY = process.env.JWT_KEY

const authMiddleware = async (req, res, next) => {
    // extract token from auth headers
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
  
    try {
      const {id} = jwt.verify(token, JWT_KEY);
      const user = await db.User.findAll({
        where: { id: `${id}`},
        include: db.Data})
      if (!user) return res.sendStatus(401);
      req.user = user;
      next();
    } catch (error) {
      res.sendStatus(401);
    }
	};
	
module.exports = authMiddleware;