import express from 'express'
import { ITokenedRequest } from '../../src/src/app';
import base64 from 'base-64';
import jwt from 'jsonwebtoken'
import User from '../models/users';
const { SECRET } = process.env;

export default async function authorize(req: ITokenedRequest, res: express.Response, next: any) {
  if (!req.headers.authorization) {

    next(new Error('no authorization headers'))
  } else {
    //1. decode the JWT
    const parsed = req.headers.authorization.split(' ').pop();
    try {
      //2. decodes and verifies that the token is not expired (30s)
      const decoded = jwt.verify(parsed, SECRET, { maxAge: '5m' }) as any; // return obj is typed any.

      //3. see if the user exists
      const user = await User.findOne({ username: decoded.username }).populate('role');

      if (user.username) {
        //IF all the checks check out, then they have an account. Put them on the req obj.
        //the token will be used in subsequent requests
        //the user will be used by permissions middleware in this request.
        req.token = parsed;
        req.user = user;
        next();
      } else {

        next(new Error('that user doesnt exist'))
      }
    } catch (err) {
      next(err)
    }
  }
}

