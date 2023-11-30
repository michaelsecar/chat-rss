const express = require('express')
const path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, 'public')))
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
    console.log(`Servidor http corriendo en: ${port}`)
})