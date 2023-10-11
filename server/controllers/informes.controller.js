export class InformeController {
  constructor ({ informeModel }) {
    this.informeModel = informeModel
  }

  count = async (req, res) => {
    const { name } = req.query
    if (!name || !TABLES.includes(name)) return res.status(400).json({ DBPlanificacion: 'Table not found' })
    const response = await this.informeModel.count({ name })
    res.json(response)
  }

  byMonth = async (req, res) => {
    const { name } = req.query
    if (!name || !TABLES.includes(name)) return res.status(400).json({ DBPlanificacion: 'Table not found' })
    const response = await this.informeModel.byMonth({ name })
    res.json(response)
  }

  all = async (req, res) => {
    const { prev_year } = req.query
    const actualYear = new Date().getFullYear()
    let data = prev_year ? { name: actualYear - 1 } : { name: actualYear }

    const result = TABLES.map(async name => {
      const response = await this.informeModel.count({ name, prevYear: prev_year })
      data = { ...data, [name]: response }
      // return { [name]: response }
    })
    await Promise.all(result)
    res.json(data)
  }

  // getById = async (req, res) => {
  //   const { id } = req.params
  //   const response = await this.informeModel.getById({ id })
  //   if (response) return res.json(response)
  //   res.status(404).json({ DBPlanificacion: 'Planificacion not found' })
  // }

  // create = async (req, res) => {
  //   const result = req.body
  //   if (!result) return res.status(400).json({ DBPlanificacion: JSON.parse(result) })
  //   const newMovie = await this.informeModel.create({ input: result })
  //   res.status(201).json(newMovie)
  // }

  // delete = async (req, res) => {
  //   const { id } = req.params
  //   const result = await this.informeModel.delete({ id })
  //   if (result === false) return res.status(404).json({ DBPlanificacion: 'Planificacion not found' })
  //   if (result.error === 1451) return res.status(409).json({ DBPlanificacion: 'Planificacion has dependencies' })
  //   return res.json({ DBPlanificacion: 'Planificacion deleted' })
  // }

  // update = async (req, res) => {
  //   const body = req.body
  //   if (!body) return res.status(400).json({ DBHistoria: JSON.parse(body) })
  //   const { id } = req.params
  //   const updatedMovie = await this.informeModel.update({ id, input: body })
  //   return res.json(updatedMovie)
  // }
}

const TABLES = ['historias_clinicas', 'planificaciones', 'seccion_b', 'terceros']
