const express = require('express');
const db = require('./models/index');
const router = require('./router');
const cors = require('cors')
const passport = require ('passport')

const app = express();

//FIX WE CAN ADD HEAR A CORS CONFIG
app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(router);

(async () =>{
  try {
    await db.sequelize.authenticate();
    console.log('Connection to db has been established successfully.'); // eslint-disable-line no-console
    await db.sequelize.sync(); //{force: true}
    const port = process.env.PORT || 9000;
    app.listen(port);
    console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();