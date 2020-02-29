import express from 'express';
import ITokenRequest, { ITokenedRequest }  from '../src/app';

export default function (requiredPermission: string) {
  return function (req: ITokenedRequest, res: express.Response, next: any) {
    console.log('**ACL** req.user.role  = ', req.user.role);
    if (req.user.role.name === requiredPermission || req.user.role.permission.includes(requiredPermission)) {
      next()
    } else {
      next(new Error('Wrong permissions: you shall not pass.'))
    }

  }
}