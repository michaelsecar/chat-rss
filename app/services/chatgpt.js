const { OpenAI, Configuration} = require("openai")
require('dotenv').config()

var messagesHistoric = [
  {
    "role": "system",
    "content": "Eres un asistente que solamente trata topicos relacionados a la tecnologia, especificamente a la programación."
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
    return completion.choices[0].message.content
  }
  catch (error)
  {
    console.error("Error: Referente a las limitaciones de consultas a ChatGPT")
    console.error(error)
    // Mientras la API esta desactivada, se retornara un mensaje de prueba
    return "Mensaje de respuesta temporal"
  }
}

exports.send2ChatGPT = send2ChatGPT