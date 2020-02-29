import express from 'express';
import User from '../models/users';
import basicAuth from '../middleware/basicAuth'
import bcrypt from 'bcrypt';
import bearerAuth from '../middleware/bearerAuth';

//interfaces
export interface ITokenedRequest extends express.Request {
  token?: string;
  user?: string;
  bearer?: string | {[key: string]: any}
}

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
      res.status(201).json({ token: newUser.generateToken() })
    })
    .catch(err => res.status(406).json({ error: err.message }));
})

//get all users from db.
app.get('/users', (req: ITokenedRequest, res) => {
  console.log(req.token);
  User.find()
  .then(results => {
    res.status(200).json(results)
  })
  .catch(console.log)
})

//authenticate a user's credentials with middleware. 
app.post('/signin', basicAuth, (req: ITokenedRequest , res) => {
  console.log(req.token)
  res.status(200).json({ token: req.token} )
})

//todo: user bearerAuth middleware to authenticate bearer credentials. 
app.post('/betterlogin', bearerAuth, (req, res, next) => {
 res.status(200).json({message: 'signed in'}) 
})

//catch alls
import serverErrorHandler from '../middleware/500';
app.use(serverErrorHandler); //handle 500 errors, this triggers when we throw or generate an error.

import notFoundHandler from '../middleware/404';
app.use(notFoundHandler);

export default {
  app: app,
  start: (port: string) => {
    const PORT = port || 3000;
    app.listen(PORT, () => {
      console.log('Listining on 3000')
    })
  }
}


