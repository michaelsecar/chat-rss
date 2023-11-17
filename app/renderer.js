const textoHTML = document.getElementById("texto")
const botonHTML = document.getElementById("boton")
const chatHTML = document.getElementById("chat")

botonHTML.addEventListener("click", (event) => {
    event.preventDefault()
    let texto = textoHTML.value
    window.electronAPI.sendMessage(texto)
    textoHTML.value = ""
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
    chatHTML.appendChild(div)
}

window.electronAPI.onMessage((event, data) => {
    console.log(data.message.dataValues.message)
    text = data.message.dataValues.message
    date = data.message.dataValues.createdAt.toString().split(" ")
    date_text  = `${date[2]}-${date[1]}-${date[3]}: ${date[4]}` 
    renderChatItem (text, date_text, "mensaje")
})

window.electronAPI.onResponse((event, data) => {
    console.log(data.response.dataValues.response)
    text = data.response.dataValues.response
    date = data.response.dataValues.createdAt.toString().split(" ")
    date_text  = `${date[2]}-${date[1]}-${date[3]}: ${date[4]}` 
    renderChatItem (text, date_text, "respuesta")
})



