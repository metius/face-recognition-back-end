/*  SUMMARY:
/                   -->     res = this is working
/signin             -->     POST = succes/fail
/register           -->     POST = user
/profile/:userID    -->     GET = user
/image              -->     PUT --> user
*/


const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test123',
      database : 'smart-brain'
    }
});


const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {res.send(database.users[0])});
//  signin             -->     POST = succes/fail
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
//  /register           -->     POST = user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
//  /profile/:userID    -->     GET = user
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
//  /image -->   PUT --> user
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3010, ()=> {
    console.log('app is runnig on port 3010');
})

