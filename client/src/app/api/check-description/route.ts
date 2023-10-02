import api from '@/api'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''
const openaiToken = process.env.OPENAI_TOKEN ?? ''

const openai = new OpenAI({
  apiKey: openaiToken
})

// const configuration = new Configuration({ apiKey: openaiToken })
// const openai = new OpenAIApi(configuration)

// [{ role: 'system', content: 'You are a helpful assistant.' },
// { role: 'user', content: 'Who won the world series in 2020?' },
// { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
// { role: 'user', content: 'Where was it played?' }],

const INITIAL_MESSAGES = {
  role: 'system',
  content: 'Quiero que cuando te pase una descripción con las historias clinicas de baja complejidad de enfermeria con el formato de colombia de un paciente, generes un resumen con maximo 300 caracteres, se conciso, estricto y directo.'
}

// async function getOfferDescriptionById (id: string) {
//   const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Basic ${infojobsToken}`
//     }
//   })
//   const { description } = await res.json()
//   return description
// }

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id == null) {
    return new Response('Missing id', { status: 400 })
  }

  const description = await api.get.parsedHistoria({ id })

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: INITIAL_MESSAGES.content },
      { role: 'user', content: JSON.stringify(description) }
    ],
    model: 'gpt-3.5-turbo'
  })

  const data = chatCompletion.choices[0].message?.content ?? ''
  // let json
  try {
    // json = JSON.parse(data)
    return NextResponse.json({ data })
  } catch (e) {
    console.log(e)
    return new Response('Error parsing JSON', { status: 500 })
  }
}
