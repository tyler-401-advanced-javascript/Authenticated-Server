import express from 'express';
import { ITokenedRequest } from '../src/app'

export default function notFoundHandler (req: ITokenedRequest, res: express.Response, next: any ) {
  res.status(404).json({message: 'The resource you requested does not exist. Please hang up and try again later'})

}