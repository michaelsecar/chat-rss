const textInput = document.getElementById("texto")
const sendButton = document.getElementById("enviar")
const loginButton = document.getElementById("ingresar")
const improveButton = document.getElementById("mejorar")
const chatNode = document.getElementById("chat")

sendButton.addEventListener("click", (event) => {
    event.preventDefault()
    let texto = textInput.value
    window.electronAPI.sendMessage(texto)
    textInput.value = ""
}) 

improveButton.addEventListener("click", (event)=>{
    event.preventDefault()
    console.log("Mejora de la respuesta")
    let texto = textInput.value
    // Solicitud al proceso principal de atender la cadena mediante le modelo
    // window.electronAPI.improveMessage(texto)
})

const renderChatItem = (text, date, type) => {
    const div = document.createElement("div")
    const div_date = document.createElement("div")
    div.classList.add("chatItem")
    div.classList.add(type)
    div_date.classList.add("fecha")
    div.innerHTML = text
    div_date.innerHTML = date
    div.appendChild(div_date)
    chatNode.appendChild(div)
}

window.electronAPI.onLogin((event, data)=>{
    console.log("El usuario se ha logueado")
})

 window.electronAPI.onImproved((event, data)=>{
    console.log("Se ha recibido la sugerencia del modelo")
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
