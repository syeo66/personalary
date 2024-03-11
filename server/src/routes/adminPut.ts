import type { RequestHandler } from 'express'
import fs from 'fs'
import { mergeDeepLeft } from 'ramda'

import { CONFIG_DIR, USER_CONFIG_PATH } from '../loadConfig'
import { InputParamSchema } from './types'

const adminPut: RequestHandler = (req, res) => {
  let userConfig = {}

  if (fs.existsSync(USER_CONFIG_PATH)) {
    const userConfigString = fs.readFileSync(USER_CONFIG_PATH, 'utf8')
    try {
      userConfig = JSON.parse(userConfigString)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Could not parse user config file at ${USER_CONFIG_PATH}`)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  const body = InputParamSchema.parse(req.body)
  const merged = mergeDeepLeft(body)(userConfig)

  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR)
  }
  fs.writeFileSync(USER_CONFIG_PATH, JSON.stringify({ ...merged }, null, '  '))

  res.json({ status: 'OK' })
}

export default adminPut
