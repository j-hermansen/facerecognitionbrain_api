const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
        host : process.env.DATABASE_URL,
        user : 'acvwfrofemrzey',
        password : '9c191326212adfff2c325f3a1490fb84d4fa521cb4e98928e09b0259432d57c0',
        database : 'd9em997nuu8tq0'
    }
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

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/* API endpoints

    /                --> res = this is working
    /singin          --> POST = success/fail
    /register        --> POST = user
    /profile/:userId --> GET = user
    /image           --> PUT = user

 */
