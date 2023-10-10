import 'dotenv/config'
import express, { json } from 'express'
import { createPool } from 'mysql2/promise'
import { corsMiddleware } from './middlewares/cors.js'

import { selfBlockMiddleware } from './middlewares/self-block.js'
import { createHistoriaRouter } from './routes/historias.routes.js'
import { createInformeRouter } from './routes/informes.routes.js'
import { createPlanificacionRouter, createSeccionBRouter } from './routes/planificaciones.routes.js'
import { createTerceroRouter } from './routes/terceros.routes.js'

// después
export const createApp = ({ terceroModel, historiaModel, planificacionModel, seccionBModel, informeModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.get('/', (_req, res) => { res.send('Hello World!') })

  // app.use('/movies',selfBlockMiddleware, createMovieRouter({ movieModel }))
  app.use('/historias', selfBlockMiddleware, createHistoriaRouter({ historiaModel }))
  app.use('/terceros', selfBlockMiddleware, createTerceroRouter({ terceroModel }))
  app.use('/planificaciones', selfBlockMiddleware, createPlanificacionRouter({ planificacionModel }))
  app.use('/seccionb', selfBlockMiddleware, createSeccionBRouter({ seccionBModel }))
  app.use('/informes', selfBlockMiddleware, createInformeRouter({ informeModel }))

  // hello word route /

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

const PROD_CONFIG = {
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  port: process.env.MYSQLPORT,
  password: process.env.MYSQLPASSWORD
}

console.log("🚀 ~ file: app.js:55 ~ process.env.NODE_ENV === 'production':", process.env.NODE_ENV === 'production')
const connectionString = process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEFAULT_CONFIG

export const pool = createPool(connectionString)
