export class PlanificacionController {
  constructor ({ planificacionModel }) {
    this.planificacionModel = planificacionModel
  }

  getAll = async (req, res) => {
    const { id } = req.query
    const response = await this.planificacionModel.getAll({ id })
    res.json(response)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const response = await this.planificacionModel.getById({ id })
    if (response) return res.json(response)
    res.status(404).json({ DBPlanificacion: 'Planificacion not found' })
  }

  create = async (req, res) => {
    const result = req.body
    if (!result) return res.status(400).json({ DBPlanificacion: JSON.parse(result) })
    const newMovie = await this.planificacionModel.create({ input: result })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.planificacionModel.delete({ id })
    if (result === false) return res.status(404).json({ DBPlanificacion: 'Planificacion not found' })
    return res.json({ DBPlanificacion: 'Planificacion deleted' })
  }

  update = async (req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ DBHistoria: JSON.parse(body) })
    const { id } = req.params
    const updatedMovie = await this.planificacionModel.update({ id, input: body })
    return res.json(updatedMovie)
  }
}

export class SeccionBController {
  constructor ({ seccionBModel }) {
    this.seccionBModel = seccionBModel
  }

  getAll = async (req, res) => {
    const { id } = req.query
    const response = await this.seccionBModel.getAll({ id })
    res.json(response)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const response = await this.seccionBModel.getById({ id })
    if (response) return res.json(response)
    res.status(404).json({ DBPlanificacion: 'seccionB not found' })
  }

  create = async (req, res) => {
    const result = req.body
    if (!result) return res.status(400).json({ DBseccionB: JSON.parse(result) })
    const newMovie = await this.seccionBModel.create({ input: result })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.seccionBModel.delete({ id })
    if (result === false) return res.status(404).json({ DBseccionB: 'seccionB not found' })
    return res.json({ DBseccionB: 'seccionB deleted' })
  }

  update = async (req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ DBHistoria: JSON.parse(body) })
    const { id } = req.params
    const updatedMovie = await this.seccionBModel.update({ id, input: body })
    return res.json(updatedMovie)
  }
}
