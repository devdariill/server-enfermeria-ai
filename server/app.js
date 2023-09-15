import 'dotenv/config'
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

import { createPool } from 'mysql2/promise'

// después
export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

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
