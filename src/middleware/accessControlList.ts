import express from 'express';
import ITokenRequest, { ITokenedRequest }  from '../src/app';

export default function (permission: string) {
  return function (req: ITokenedRequest, res: express.Response, next: any) {
    if (req.user.role.permissions.includes(permission)) {
      next()
    } else {
      next(new Error('Wrong permissions: you shall not pass.'))
    }

  }
}