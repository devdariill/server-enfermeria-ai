import { Router } from 'express'
import { HistoriaController } from '../controllers/historias.controller.js'

export const createHistoriaRouter = ({ historiaModel }) => {
  const historiasRouter = Router()

  const historiaController = new HistoriaController({ historiaModel })

  historiasRouter.get('/', historiaController.getAll)
  historiasRouter.post('/:id', historiaController.create)

  historiasRouter.get('/:id', historiaController.getById) // TODO :historia
  historiasRouter.delete('/:id', historiaController.delete)
  historiasRouter.patch('/:id', historiaController.update)

  return historiasRouter
}
