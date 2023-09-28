import 'dotenv/config'
import express, { json } from 'express'
import { createPool } from 'mysql2/promise'
import { corsMiddleware } from './middlewares/cors.js'

import { createHistoriaRouter } from './routes/historias.routes.js'
import { createPlanificacionRouter, createSeccionBRouter } from './routes/planificaciones.routes.js'
import { createTerceroRouter } from './routes/terceros.routes.js'

// después
export const createApp = ({ terceroModel, historiaModel, planificacionModel, seccionBModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  // app.use('/movies', createMovieRouter({ movieModel }))
  app.use('/historias', createHistoriaRouter({ historiaModel }))
  app.use('/terceros', createTerceroRouter({ terceroModel }))
  app.use('/planificaciones', createPlanificacionRouter({ planificacionModel }))
  app.use('/seccionb', createSeccionBRouter({ seccionBModel }))

  const PORT = process.env.PORT ?? 3001

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
