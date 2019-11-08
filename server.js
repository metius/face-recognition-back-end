/*  SUMMARY:
/                   -->     res = this is working
/signin             -->     POST = succes/fail
/register           -->     POST = user
/profile/:userID    -->     GET = user
/image              -->     PUT --> user
*/


const express = require('express');
//const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users[0]);
})

//  signin             -->     POST = succes/fail
app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in!');
    }
})

//  /register           -->     POST = user
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

//  /profile/:userID    -->     GET = user
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;

    database.users.forEach( user => {
        if(user.id === id ) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('not found');
    }
})

//  /image -->   PUT --> user
app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;

    database.users.forEach( user => {
        if(user.id === id ) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('not found');
    }
})

// Bcrypt
/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3010, ()=> {
    console.log('app is runnig on port 3010');
})

