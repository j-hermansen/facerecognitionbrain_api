const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors())




const database = {
    users: [
        {
            id: '123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            password: 'bananas',
            email: 'sally@email.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    bcrypt.compare("test", '$2a$10$20ajjSYqiroPQz5bvWENbOKi8odJ8c5UVWLF4.GWABQwBM21TXRLm', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$20ajjSYqiroPQz5bvWENbOKi8odJ8c5UVWLF4.GWABQwBM21TXRLm', function(err, res) {
        console.log('second guess', res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("SUCCESSFULLY SIGNED IN");
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json('Not found');
    }
});

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('Not found');
    }
});

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


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
