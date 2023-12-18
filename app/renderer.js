const textInput = document.getElementById("texto")
const sendButton = document.getElementById("enviar")
const loginButton = document.getElementById("ingresar")
const improveButton = document.getElementById("mejorar")
const chatNode = document.getElementById("chat")

var sugerencia = ""
var tipo = ""
var mensaje = ""

textInput.addEventListener("keyup", (event)=>{
    sugerencia = ""
    tipo = ""
    mensaje = event.target.value
})

sendButton.addEventListener("click", (event) => {
    event.preventDefault()
    window.electronAPI.sendMessage(mensaje, sugerencia)
    textInput.value = ""
}) 

improveButton.addEventListener("click", (event)=>{
    event.preventDefault()
    console.log("Mejora de la respuesta")
    window.electronAPI.sendImprove(mensaje)
})

const renderChatItem = (text, date, type) => {
    const div = document.createElement("div")
    const div_date = document.createElement("div")
    div.classList.add("chatItem")
    div.classList.add(type)
    div_date.classList.add("fecha")
    // Manejando el codigo generado
    const hasCodeBlock = text.includes("```");
    if (hasCodeBlock) {
        const codeContent = text.replace(/```([\s\S]+?)```/g, '</p><pre><code>$1</code></pre><p>')
        div.innerHTML = `<p>${codeContent}</p>`
    }
    else {
        div.innerHTML = text
    }
    div_date.innerHTML = date
    div.appendChild(div_date)
    chatNode.appendChild(div)
}

window.electronAPI.onLogin((event, data)=>{
    console.log("El usuario se ha logueado")
})

 window.electronAPI.onImproved((event, data)=>{
    // prompt, suggestion, type
    formated = JSON.parse(data.response)
    // Actualizando entrada
    sugerencia = formated.sugestion??formated.sugerencia??formated.suggestion
    tipo = formated.type??formated.tipo
    textInput.value = sugerencia 
    console.log(formated)
    // Actualizando variables globales
}) 

const getTimeFormated = () => {
    let date = new Date()
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`
}

window.electronAPI.onMessage((event, data) => {
    console.log(data)
    let text = data.message.mensaje
    let date_text = getTimeFormated()
    renderChatItem (text, date_text, "mensaje")
})

window.electronAPI.onResponse((event, data) => {
    console.log(data)
    text = data.response.respuesta
    date_text = getTimeFormated()
    renderChatItem (text, date_text, "respuesta")
})
