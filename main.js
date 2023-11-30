const { app, ipcMain, BrowserWindow} = require('electron')
const path = require('node:path')
const { saveMessage, saveResponse } = require('./app/services/database')
const { send2ChatGPT } = require('./app/services/chatgpt')
// const { login } = require('./app/services/authentication')

let mainWindow 

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
    return win 
}

app.whenReady().then(() => {
    mainWindow = createWindow()
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
        mainWindow.webContents.send("on-message", {message:mes.data})
        // Obteniendo la respuesta de ChatGPT 
        send2ChatGPT(message)
        .then(response => {
            // Gestionando la respuesta
            saveResponse(mes.id, response)
            .then(res=>{
                mainWindow.webContents.send("on-response", {response:res.data})
            })
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
    })
    .catch(err=>console.error(err))
})

/*
ipcMain.on("send-login", (event, _data) => {
    login()
})
*/