import cors from 'cors'
import 'dotenv/config'

// const ACCEPTED_ORIGINS = [
//   process.env.NODE_ENV === 'production'
//     ? 'https://enfermeria-ai.vercel.app/'
//     : 'http://localhost:3000'
// ]
const ACCEPTED_ORIGINS = [
  'https://enfermeria-ai.vercel.app/',
  'http://localhost:3000'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      console.log('🚀 ~ file: cors.js:17 ~ corsMiddleware ~ origin:', origin)
      return callback(null, true)
    }

    if (!origin) {
      console.log('🚀 ~ file: cors.js:22 ~ corsMiddleware ~ origin:', origin)
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
