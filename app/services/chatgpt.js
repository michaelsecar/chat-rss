const { OpenAI, Configuration} = require("openai")
require('dotenv').config()

var openai = new OpenAI({apiKey: process.env['OPENAI_API_KEY']})
var messagesHistoric = {'messages': [{"role": "system", "content": "Eres un asistente que solamente trata topicos relacionados a la tecnologia, especificamente a la programación."}]}
var promptSetup = {'messages': [{'role': 'system', 'content': 'Eres un formateador de entradas, respondes a las entradas que en formato json indicando: el prompt inicial, el tipo de solicitud que se realiza y una sugerencia que mejore el prompt inicial; con el siguiente formato: {"prompt": "PROMPT", "type": "TIPO", "sugestion": "SUGERENCIA"}'}]}

const send2ChatGPT = async (consulta, sugerencia=false) => {
  // Seleccionando el estado del modelo
  let model_state = sugerencia?promptSetup:messagesHistoric
  model_state['messages'].push({"role":"user", "content":consulta})
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: model_state.messages
    })
    const response = completion.choices[0].message.content
    // Agregando la respuesta al historico
    if (!sugerencia) {
      messagesHistoric['messages'].push({"role":"assistant", "content":response})
    }
    return response
  }
  catch (error)
  {
    console.error("Error: Referente a las limitaciones de consultas a ChatGPT")
    console.error(error)
    // Mientras la API esta desactivada, se retornara un mensaje de prueba
    return "No se pudo completar la consulta"
  }
}

exports.send2ChatGPT = send2ChatGPT