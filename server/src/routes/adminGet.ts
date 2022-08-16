import type { RequestHandler } from 'express'

import loadConfig from '../loadConfig'

const adminGet: RequestHandler = (_req, res) => {
  const config = loadConfig()
  return res.send(config)
}

export default adminGet
