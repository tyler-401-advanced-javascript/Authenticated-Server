import express from 'express';
import User from '../models/users';
import basicAuth from '../middleware/basicAuth'
import bcrypt from 'bcrypt';
import bearerAuth from '../middleware/bearerAuth';
import Role from '../models/roles'

import acl from '../middleware/accessControlList'


//consts
const chickens = [
  { name: 'chickety china', username: 'the chinese chicken' }
]
//interfaces
export interface ITokenedRequest extends express.Request {
  token?: string;
  user?: { [key: string]: any};
  bearer?: string | {[key: string]: any}
}

const app = express();
app.use(express.json());

//auth routes
app.post('/signup', async (req, res) => {
  
  //create instance of model with new user data. And save to DB
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 5),
    role: await Role.findOne({name: req.body.role})
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

app.post('/betterlogin', bearerAuth, acl('read'), (req, res, next) => {
  res.status(200).json({message: 'signed in'}) 
})

app.get('/chickens', bearerAuth, acl('admin'), (req, res, next) => {
  res.status(200).json(chickens);
})

//roles routes
import rolesRouter from './rolesRouter';
app.use(rolesRouter);

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


