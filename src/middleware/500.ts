import express from 'express'
export default function serverErrorHandler(err: Error, req: express.Request, res: express.Response, next: any) {
  res.status(500).json({ error: err.message })
}