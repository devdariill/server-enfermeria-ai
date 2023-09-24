export class TerceroController {
  constructor ({ terceroModel }) {
    this.terceroModel = terceroModel
  }

  getAll = async (req, res) => {
    const { search } = req.query
    const terceros = await this.terceroModel.getAll({ search })
    res.json(terceros)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const tercero = await this.terceroModel.getById({ id })
    if (tercero) return res.json(tercero)
    res.status(404).json({ message: 'Tercero not found' })
  }

  create = async (req, res) => {
    const result = req.body
    console.log('🚀 ~ file: terceros.controller.js:21 ~ TerceroController ~ create= ~ result:', result)

    if (!result) {
    // 422 Unprocessable Entity
      return res.status(400).json({ DBTercero: JSON.parse(result) })
    }

    const newMovie = await this.terceroModel.create({ input: result })

    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.terceroModel.delete({ id })

    if (result?.error === 1451) {
      return res.status(404).json({ message: 'Eliminar Historias Clinicas Primero' })
    }

    return res.json({ message: 'Tercero deleted' })
  }

  update = async (req, res) => {
    const result = req.body
    if (!result) {
      return res.status(400).json({ DBTercero: JSON.parse(result) })
    }
    const { id } = req.params
    const updatedMovie = await this.terceroModel.update({ id, input: result })
    return res.json(updatedMovie)
  }
}
