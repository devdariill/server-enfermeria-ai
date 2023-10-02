import { pool } from '../app.js'

const DB_TABLE = 'historias_clinicas'

export class HistoriaModel {
  static async getAll ({ id }) {
    const [result] = await pool.query(`SELECT * FROM ${DB_TABLE} WHERE id_tercero = ? LIMIT 10;`, [id])
    if (result.length === 0) return []
    return result
  }

  static async getById ({ id }) {
    const [result] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE, id])
    if (result.length === 0) return null
    return result[0]
  }

  static async create ({ input }) {
    if (!input) throw new Error('Error creating historia')
    if (!input.firma) input.firma = 1 // TODO: generate by gmail
    const keys = Object.keys(input)
    const values = Object.values(input)
    let id
    try {
      const query = `INSERT INTO ?? (${keys.join(',')}) VALUES (${values.map(() => '?').join(',')})`
      const [result] = await pool.query(query, [DB_TABLE, ...values])
      id = result.insertId
    } catch (e) {
      console.error('🚀 ~ file: historias.model.js:28 ~ HistoriaModel ~ create ~ e:', e)
      // throw new Error('Error creating history')
    }
    const [historia] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE, id])
    return historia[0]
  }

  static async delete ({ id }) {
    try {
      await pool.query('DELETE FROM ?? WHERE id = ?;', [DB_TABLE, id])
      return true
    } catch (error) {
      if (error?.errno === 1451) return { error: 1451 }
      console.error('🚀 ~ file: historias.js:96 ~ HistoriaModel ~ delete ~ error:', error)
      // throw new Error('Error deleting historia')
    }
  }

  static async update ({ id, input }) {
    const query = 'UPDATE ?? SET ? WHERE id = ?'
    try {
      await pool.query(query, [DB_TABLE, input, id])
      return true
    } catch (error) {
      console.error('🚀 ~ file: historias.model.js:113 ~ HistoriaModel ~ update ~ error:', error)
      // throw new Error('Error updating historia')
    }
  }
}
