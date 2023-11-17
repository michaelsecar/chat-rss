const { OpenAI, Configuration} = require("openai")
require('dotenv').config()

var messagesHistoric = [
  {
    "role": "system",
    "content": "Eres un asistente enfocado en topicos de programacion"
  },
]

const send2ChatGPT = async (consulta) => {
  messagesHistoric.push({"role":"user", "content":consulta})
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  })
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagesHistoric
    })
  }
  catch (error)
  {
    console.error("Error: Referente a las limitaciones de consultas a ChatGPT")
    // Mientras la API esta desactivada, se retornara un mensaje de prueba
    return "Mensaje de respuesta temporal"
  }
  return completion.choices[0].message.content
}

exports.send2ChatGPT = send2ChatGPT