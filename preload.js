const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // SEND
  sendMessage: (message) => ipcRenderer.send('send-message', message),

  // ON
  onStart: (data) => ipcRenderer.on('on-start', data),
  onMessage: (data) => ipcRenderer.on('on-message', data),
  onResponse: (data) => ipcRenderer.on('on-response', data)
})