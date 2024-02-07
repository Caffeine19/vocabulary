import pino from 'pino'

import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import { join } from 'path'

const logPath = is.dev ? './app.log' : join(app.getPath('userData'), 'app.log')

const transport = pino.transport({
  target: 'pino/file',
  options: { destination: logPath, mkdir: true }
})
pino(transport)

const logger = pino(transport)

export default logger
