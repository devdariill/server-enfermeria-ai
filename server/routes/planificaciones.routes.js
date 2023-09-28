import { Router } from 'express'
// import { HistoriaController } from '../controllers/historias.controller.js'
import { PlanificacionController, SeccionBController } from '../controllers/planificaicones.controller.js'

export const createPlanificacionRouter = ({ planificacionModel }) => {
  const planificacionesRouter = Router()

  const planificacioneController = new PlanificacionController({ planificacionModel })

  planificacionesRouter.get('/', planificacioneController.getAll)
  planificacionesRouter.post('/', planificacioneController.create)

  planificacionesRouter.get('/:id', planificacioneController.getById) // TODO :planificacione
  planificacionesRouter.delete('/:id', planificacioneController.delete)
  planificacionesRouter.patch('/:id', planificacioneController.update)

  return planificacionesRouter
}

export const createSeccionBRouter = ({ seccionBModel }) => {
  const seccionBsRouter = Router()

  const seccionBController = new SeccionBController({ seccionBModel })

  seccionBsRouter.get('/', seccionBController.getAll)
  seccionBsRouter.post('/:id', seccionBController.create)

  seccionBsRouter.get('/:id', seccionBController.getById) // TODO :seccionB
  seccionBsRouter.delete('/:id', seccionBController.delete)
  seccionBsRouter.patch('/:id', seccionBController.update)

  return seccionBsRouter
}
