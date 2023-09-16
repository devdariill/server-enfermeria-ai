import { pool } from '../app.js'

const DB_TABLE = 'terceros'

export class TerceroModel {
  static async getAll ({ nombre }) {
    if (nombre) {
      const lowerCase = nombre.toLowerCase()

      const [result] = await pool.query(
        'SELECT * FROM ?? WHERE LOWER(nombre) = ? ;',
        [DB_TABLE, lowerCase]
      )

      if (result.length === 0) return []

      console.log('🚀 ~ file: terceros.js:18 ~ TerceroModel ~ getAll ~ result:', result)
      return result
    }

    const [terceros] = await pool.query(
      `SELECT * FROM ${DB_TABLE} LIMIT 10;`
      // 'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return terceros
  }

  static async getById ({ id }) {
    const [tercero] = await pool.query(
      'SELECT * FROM ?? WHERE id = ?;',
      [DB_TABLE, id]
      // `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
      //   FROM movie WHERE id = UUID_TO_BIN(?);`,
      // [id]
    )

    if (tercero.length === 0) return null

    return tercero[0]
  }

  static async create ({ input }) {
    // const {
    //   genre: genreInput, // genre is an array
    //   title,
    //   year,
    //   duration,
    //   director,
    //   rate,
    //   poster
    // } = input

    const keys = Object.keys(input)
    const values = Object.values(input)

    // // crypto.randomUUID()
    // const [uuidResult] = await pool.query('SELECT UUID() uuid;')
    // const [{ uuid }] = uuidResult
    let id

    try {
      // await pool.query(
      //   `INSERT INTO movie (id, title, year, director, duration, poster, rate)
      //     VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
      //   [title, year, director, duration, poster, rate]
      // )
      const query = `INSERT INTO ?? (${keys.join(',')}) VALUES (${values.map(() => '?').join(',')})`
      const [result] = await pool.query(query, [DB_TABLE, ...values])
      id = result.insertId
    } catch (e) {
      console.log('🚀 ~ file: terceros.model.js:72 ~ TerceroModel ~ create ~ e:', e)
      // puede enviarle información sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    // const [movies] = await pool.query(
    //   `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
    //     FROM movie WHERE id = UUID_TO_BIN(?);`,
    //   [uuid]
    // )
    const [tercero] = await pool.query(
      'SELECT * FROM ?? WHERE id = ?;',
      // 'SELECT * FROM ?? WHERE id = LAST_INSERT_ID();',
      [DB_TABLE, id]
    )
    return tercero[0]
  }

  static async delete ({ id }) {
    // crear el delete
    try {
      await pool.query(
        'DELETE FROM ?? WHERE id = ?;',
        [DB_TABLE, id]
      )
      console.log('🚀 ~ file: terceros.js:96 ~ TerceroModel ~ delete ~ id', id)
      return true
    } catch (error) {
      console.log('🚀 ~ file: terceros.js:96 ~ TerceroModel ~ delete ~ error:', error)
      throw new Error('Error deleting tercero')
    }
  }

  static async update ({ id, input }) {
    console.log('🚀 ~ file: terceros.model.js:96 ~ TerceroModel ~ update ~ id', id, input)
    const query = 'UPDATE ?? SET ? WHERE id = ?'
    try {
      const [result] = await pool.query(query, [DB_TABLE, input, id])
      console.log('🚀 ~ file: terceros.model.js:111 ~ TerceroModel ~ update ~ result:', result)
      return true
    } catch (error) {
      console.log('🚀 ~ file: terceros.model.js:113 ~ TerceroModel ~ update ~ error:', error)
      throw new Error('Error updating tercero')
    }
  }
}
