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
      const decoded = jwt.verify(parsed, SECRET, { maxAge: '10000' }) as any; // return obj is typed any.

      //todo: 3. see if the user exists, this is dirty
      const user = await User.findOne({ username: decoded.username })

      if (user.username) {
        //IF all the checks check out, put token on the req object.
        req.token = parsed;
        next();
      } else {
        next(new Error('that user doesnt exist'))
      }
    } catch (err) {
      next(err)
    }
  }
}

