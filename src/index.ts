//dependencies
import express from 'express';
import User from './models/users';
import basicAuth from './middleware/basicAuth'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//interfaces
interface Requesti {
  token: string;
}

dotenv.config();
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

//functions

//get the username and password from the body
//insert a person into the DB
//issue a token.
app.post('/signup', async (req, res) => {

  //create instance of model with new user data. And save to DB
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 5),
  })
  newUser.save()
    .then(results => {

      //issue a token in the response.
      const token = jwt.sign({ username: results.username, email: results.email }, process.env.SECRET);
      res.status(201).json({ token })
    })
    .catch(err => res.status(406).json({ error: err.message }));
})

//get all users from db.
app.get('/users', (req: any, res) => {
  console.log(req.token);
  User.find()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(console.log)
})

//authenticate a user's credentials with middleware. 
app.post('/signin', basicAuth, (req: any, res) => {
  console.log(req.token)
  res.status(200).json({ message: 'You are now in the privileged area!' })
})

//server and DB connection area.
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('MongoDB Up!')
    app.listen(3000, () => {
      console.log('Listening on 3000');
    })
  })



