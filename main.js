const { app, ipcMain, BrowserWindow} = require('electron')
const path = require('node:path')
const { saveMessage, getMessages, startConnection, closeConnection, saveResponse } = require('./app/database')
const { send2ChatGPT } = require('./app/services/chatgpt')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //frame: false
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    .then(()=>{
        // Conexion con la base de datos
        startConnection()
        try {
            getMessages()
            .then((res)=>{
                // El callback envia los datos al render
                win.webContents.send("on-start", { messages:res})
            })
            .catch((error)=>{
                console.error(error)
            })
        }
        catch(error) {
            console.error(error)
        }
    })
    return win
}

var window
app.whenReady().then(() => {
    window = createWindow()
})

app.on('window-all-closed', () => {
    closeConnection()
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("send-message", (event, message) => {
    // Gestionando el mensaje
    saveMessage(message)
    .then(mes=> {
        // Gestion de la consulta
        window.webContents.send("on-message", {message:mes})
        // Obteniendo la respuesta de ChatGPT 
        send2ChatGPT(message)
        .then(response => {
            // Gestionando la respuesta
            saveResponse(mes.id, response)
            .then(res=>{
                window.webContents.send("on-response", {response:res})
            })
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
    })
    .catch(err=>console.error(err))

})
