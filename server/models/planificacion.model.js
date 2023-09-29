import { pool } from '../app.js'

const DB_TABLE_1 = 'planificaciones'

export class PlanificaionModel {
  static async getAll ({ id }) {
    const [result] = await pool.query(
      'SELECT * FROM ?? WHERE id_tercero = ? OR id_historia = ? ORDER BY id DESC;',
      [DB_TABLE_1, id, id]
    )
    return result || []
  }

  static async getById ({ id }) {
    const [result] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
    if (result.length === 0) return null
    return result[0]
  }

  static async create ({ input }) {
    if (!input) throw new Error('Error creating planificacion')
    const keys = Object.keys(input)
    const values = Object.values(input)
    let id
    try {
      const query = `INSERT INTO ?? (${keys.join(',')}) VALUES (${values.map(() => '?').join(',')})`
      const [result] = await pool.query(query, [DB_TABLE_1, ...values])
      id = result.insertId
    } catch (error) {
      console.log('🚀 ~ file: planificacion.model.js:29 ~ PlanificaionModel ~ create ~ e:', error)
      throw new Error('Error creating planificacion')
    }
    // const [planificacion] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
    const planificacion = await this.getById({ id })
    console.log('🚀 ~ file: planificacion.model.js:35 ~ PlanificaionModel ~ create ~ planificacion:', planificacion)
    return planificacion
  }

  static async delete ({ id }) {
    try {
      await pool.query('DELETE FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
      return true
    } catch (error) {
      console.log('🚀 ~ file: planificacion.model.js:41 ~ PlanificaionModel ~ delete ~ error:', error)
      throw new Error('Error deleting planificacion')
    }
  }

  static async update ({ id, input }) {
    const query = 'UPDATE ?? SET ? WHERE id = ?'
    try {
      await pool.query(query, [DB_TABLE_1, input, id])
      return true
    } catch (error) {
      console.log('🚀 ~ file: planificacion.model.js:52 ~ PlanificaionModel ~ update ~ error:', error)
      throw new Error('Error updating planificacion')
    }
  }
}

const DB_TABLE = 'seccion_b'

export class SeccionBModel {
  static async getAll ({ id }) {
    const [result] = await pool.query(
      'SELECT * FROM ?? WHERE id_tercero = ? OR id = ?;',
      [DB_TABLE, id, id]
    )
    return result || []
  }

  static async getById ({ id }) {
    const [result] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE, id])
    if (result.length === 0) return null
    return result[0]
  }

  static async create ({ input }) {
    if (!input) throw new Error('Error creating seccion_b')
    if (!input.firma) input.firma = 1 // TODO: generate by gmail
    const keys = Object.keys(input)
    const values = Object.values(input)
    let id
    try {
      const query = `INSERT INTO ?? (${keys.join(',')}) VALUES (${values.map(() => '?').join(',')})`
      const [result] = await pool.query(query, [DB_TABLE, ...values])
      id = result.insertId
    } catch (error) {
      console.log('🚀 ~ file: seccion-b.model.js:29 ~ SeccionBModel ~ create ~ error:', error)
      throw new Error('Error creating seccion_b')
    }
    const [planificacion] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE, id])
    return planificacion[0]
  }

  static async delete ({ id }) {
    try {
      await pool.query('DELETE FROM ?? WHERE id = ?;', [DB_TABLE, id])
      return true
    } catch (error) {
      console.log('🚀 ~ file: seccion-b.model.js:41 ~ SeccionBModel ~ delete ~ error:', error)
      throw new Error('Error deleting seccion_b')
    }
  }

  static async update ({ id, input }) {
    const query = 'UPDATE ?? SET ? WHERE id = ?'
    try {
      await pool.query(query, [DB_TABLE, input, id])
      return true
    } catch (error) {
      console.log('🚀 ~ file: seccion-b.model.js:52 ~ SeccionBModel ~ update ~ error:', error)
      throw new Error('Error updating seccion_b')
    }
  }
}
