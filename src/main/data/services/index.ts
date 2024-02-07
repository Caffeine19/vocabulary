import { PrismaClient } from '@prisma/client'

import { join } from 'path'
import { app } from 'electron'
import { is } from '@electron-toolkit/utils'
import { copyFileSync, existsSync } from 'fs'
import logger from '../../utils/log'

const prodDBPath = join(app.getPath('userData'), 'database.db')

app.getPath('appData')

const srcDBPath = join(process.resourcesPath, 'app/prisma/dev.db')
logger.info({ srcDBPath }, 'srcDBPath')

if (!is.dev && !existsSync(prodDBPath)) {
  try {
    copyFileSync(srcDBPath, prodDBPath)
    logger.info('copy db success')
  } catch (error) {
    logger.error({ error }, 'copy db error')
  }
}

//use file db in production and use env in
const datasources = is.dev
  ? {}
  : {
      db: {
        url: `file:${prodDBPath}`
      }
    }

const prisma = new PrismaClient({ datasources })

export default prisma
