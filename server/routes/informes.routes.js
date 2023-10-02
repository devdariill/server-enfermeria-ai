import { Router } from 'express'
import { InformeController } from '../controllers/informes.controller.js'

export const createInformeRouter = ({ informeModel }) => {
  const informesRouter = Router()

  const informesController = new InformeController({ informeModel })

  informesRouter.get('/', informesController.count) // http://localhost:3001/informes?name=terceros && 2
  informesRouter.get('/byMonth', informesController.byMonth) // http://localhost:3001/informes/bymonth?name=terceros && [{mes: 1, cantidad: 2}] ...
  informesRouter.get('/all', informesController.all) // http://localhost:3001/informes/all && [{terceros: 2}, {planificaciones: 2}, {seccion_b: 2}, {historias_clinicas: 2}, {usuarios: 2}]

  // informesRouter.post('/', informesController.create)

  // informesRouter.get('/:id', informesController.getById) // TODO :planificacione
  // informesRouter.delete('/:id', informesController.delete)
  // informesRouter.patch('/:id', informesController.update)

  return informesRouter
}
