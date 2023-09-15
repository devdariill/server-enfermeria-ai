import 'dotenv/config'
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createTerceroRouter } from './routes/terceros.routes.js'

import { createPool } from 'mysql2/promise'

// después
export const createApp = ({ terceroModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  // app.use('/movies', createMovieRouter({ movieModel }))
  app.use('/terceros', createTerceroRouter({ terceroModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3308,
  password: 'ronald1230',
  database: 'enfermeriadb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

export const pool = createPool(connectionString)
