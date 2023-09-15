import { Router } from 'express'
import { TerceroController } from '../controllers/terceros.controller.js'

export const createTerceroRouter = ({ terceroModel }) => {
  const tercerosRouter = Router()

  const movieController = new TerceroController({ terceroModel })

  tercerosRouter.get('/', movieController.getAll)
  tercerosRouter.post('/', movieController.create)

  tercerosRouter.get('/:id', movieController.getById)
  tercerosRouter.delete('/:id', movieController.delete)
  tercerosRouter.patch('/:id', movieController.update)

  return tercerosRouter
}
