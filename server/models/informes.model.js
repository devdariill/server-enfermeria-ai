import { pool } from '../app.js'

export class InformeModel {
  static async count ({ name, prevYear }) {
    if (!name) throw new Error('InformeModel.count: name is required')
    if (prevYear) {
      const [result] = await pool.query(
        `SELECT COUNT(*) AS count FROM ??
        WHERE created_at BETWEEN DATE_SUB(CURDATE(), INTERVAL 2 YEAR) AND DATE_SUB(now(), INTERVAL 1 YEAR);`,
        [name]
      )
      return result[0].count
    }
    const [result] = await pool.query(
      'SELECT COUNT(*) AS count FROM ??;',
      [name]
    )
    return result[0].count
  }

  static async byMonth ({ name }) {
    console.log('🚀 ~ file: informes.model.js:15 ~ InformeModel ~ byMonth ~ name', name)
    const [result] = await pool.query(
      `SELECT MONTH(created_at) AS mes, COUNT(*) AS cantidad 
      FROM ??
      WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW()
      GROUP BY mes;`,
      [name]
    )
    console.log('🚀 ~ file: informes.model.js:19 ~ InformeModel ~ byMonth ~ result', result)
    return result
  }

  // static async getAll ({ id }) {
  //   const [result] = await pool.query(
  //     'SELECT * FROM ?? WHERE id_historia = ? ORDER BY id DESC;',
  //     [DB_TABLE_1, id, id]
  //   )
  //   return result || []
  // }

  // static async getById ({ id }) {
  //   const [result] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
  //   if (result.length === 0) return null
  //   return result[0]
  // }

  // static async create ({ input }) {
  //   if (!input) throw new Error('Error creating planificacion')
  //   const keys = Object.keys(input)
  //   const values = Object.values(input)
  //   let id
  //   try {
  //     const query = `INSERT INTO ?? (${keys.join(',')}) VALUES (${values.map(() => '?').join(',')})`
  //     const [result] = await pool.query(query, [DB_TABLE_1, ...values])
  //     id = result.insertId
  //   } catch (error) {
  //     console.error('🚀 ~ file: planificacion.model.js:29 ~ InformeModel ~ create ~ e:', error)
  //     // throw new Error('Error creating planificacion')
  //   }
  //   // const [planificacion] = await pool.query('SELECT * FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
  //   const planificacion = await this.getById({ id })
  //   return planificacion
  // }

  // static async delete ({ id }) {
  //   try {
  //     await pool.query('DELETE FROM ?? WHERE id = ?;', [DB_TABLE_1, id])
  //     return true
  //   } catch (error) {
  //     if (error?.errno === 1451) return { error: 1451 }
  //     console.log('🚀 ~ file: planificacion.model.js:41 ~ InformeModel ~ delete ~ error:', error)
  //     // throw new Error('Error deleting planificacion')
  //   }
  // }

  // static async update ({ id, input }) {
  //   const query = 'UPDATE ?? SET ? WHERE id = ?'
  //   try {
  //     await pool.query(query, [DB_TABLE_1, input, id])
  //     return true
  //   } catch (error) {
  //     console.log('🚀 ~ file: planificacion.model.js:52 ~ InformeModel ~ update ~ error:', error)
  //     // throw new Error('Error updating planificacion')
  //   }
  // }
}
