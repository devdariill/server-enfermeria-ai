export class HistoriaController {
  constructor ({ historiaModel }) {
    this.historiaModel = historiaModel
  }

  getAll = async (req, res) => {
    const { id } = req.query
    const terceros = await this.historiaModel.getAll({ id })
    res.json(terceros)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const tercero = await this.historiaModel.getById({ id })
    if (tercero) return res.json(tercero)
    res.status(404).json({ message: 'Historia not found' })
  }

  create = async (req, res) => {
    const result = req.body
    if (!result) return res.status(400).json({ DBHistoria: JSON.parse(result) })
    const newMovie = await this.historiaModel.create({ input: result })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.historiaModel.delete({ id })
    if (result === false) return res.status(404).json({ message: 'Historia not found' })
    if (result.error === 1451) return res.status(409).json({ message: 'Historia has dependencies' })
    return res.json({ message: 'Historia deleted' })
  }

  update = async (req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ DBHistoria: JSON.parse(body) })
    const { id } = req.params
    const updatedMovie = await this.historiaModel.update({ id, input: body })
    return res.json(updatedMovie)
  }
}
