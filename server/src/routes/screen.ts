import type { RequestHandler } from 'express'

import connectDb from '../db'
import { Screen } from '../model'

export const screenList: RequestHandler = async (_req, res) => {
  const db = await connectDb()
  const result = await db.all<Screen[]>('SELECT * FROM Screen')
  return res.send({ items: result })
}
