import express from 'express';
import User from '../models/users'
import base64 from 'base-64';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ITokenedRequest } from '../src/app';


export default async function basicAuthorization(req: ITokenedRequest, res: express.Response, next: any) {
  if (!req.headers.authorization) {
    next(new Error('no authorization headers'))
  } else {
//oh yes
    const parsed = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(parsed);

    const [username, password] = decoded.split(':')
    console.log('username', username, 'password', password)

    User.test() // WORKS!
    
    //find that user by username inside the db })
    const results = await User.find({ username })
    console.log(results);
    if (results.length === 0) {
      return res.status(406).json({ message: 'Bad Credentials' })
    } else {

      // if credentials are good, set authorization on headers.
      if (await bcrypt.compare(password, results[0].password)) {
        //todo: Need to stick a token on the request object somehow. 
        req.token = jwt.sign({ username: username, email: results[0].email }, process.env.SECRET); 
        next();
      } else {
        res.status(500).json({ message: 'you fucked up, bad credentials' });
      }
    }
  }
}