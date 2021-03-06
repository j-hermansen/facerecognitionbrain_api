const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex ({
    client: 'pg',
    connection: process.env.DATABASE_URL
});


const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('success') });
app.post('/signin', signin.handleSignin(db, bcrypt)); // First runs handleSignin(db, bcrypt), then runs (req, res)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


/* API endpoints

    /                --> res = this is working
    /singin          --> POST = success/fail
    /register        --> POST = user
    /profile/:userId --> GET = user
    /image           --> PUT = user

 */
