import { NextResponse } from 'next/server'
// import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
// New
import OpenAI from 'openai'

const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''
const openaiToken = process.env.OPENAI_TOKEN ?? ''

const openai = new OpenAI({
  apiKey: openaiToken // This is also the default, can be omitted
})
// const configuration = new Configuration({ apiKey: openaiToken })
// const openai = new OpenAIApi(configuration)

// role: .System,ChatCompletionRequestMessageRoleEnum
// role: 'assistant',
const INITIAL_MESSAGES = [
  {
    role: 'system',

    content: `Quiero que cuando te pase una descripción de una oferta de trabajo en programación, le des una nota del 1 al 10.

    El formato de respuesta JSON será el siguiente:
    
    {
      "score": [score],
      "message": [message]
    }
    
    Tienes que cambiar lo que hay entre corchetes por el valor. El máximo de caracteres permitido para "message" es de 300. Se conciso, estricto y directo. Apunta los errores clave, especialmente los de ortografía (si existiesen) o recomendaciones claras. Por ejemplo:
    
    {
      "score": 6,
      "message": "Hay faltas de ortografía en: 'inscribete', 'solido', falta usar signos de interrogación. Se repite mucho la palabra HTML. Y faltaría clarificar los proyectos que se harían"
    }`
  }
]

async function getOfferDescriptionById (id: string) {
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infojobsToken}`
    }
  })
  const { description } = await res.json()
  return description
}

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id == null) {
    return new Response('Missing id', { status: 400 })
  }
  const description = await getOfferDescriptionById(id)
  console.log(description)
  // TODO : chatgpt
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        ...INITIAL_MESSAGES,
        role: 'user',
        content: description
      }]
  })
  // const completion = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [...INITIAL_MESSAGES, {
  //     role: ChatCompletionRequestMessageRoleEnum.User,
  //     content: description
  //   }]
  // })
  const data = completion.choices[0].message.content ?? ''
  // const data = completion.data.choices[0].message?.content ?? ''
  let json
  try {
    json = JSON.parse(data)
    return NextResponse.json(json)
  } catch (e) {
    console.log(e)
    return new Response('Error parsing JSON', { status: 500 })
  }
}
