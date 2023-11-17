const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env['DATABASE_URI'])
const Message = sequelize.define('Message', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
const Response = sequelize.define('Response', {
    response: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const startConnection = async () => {
    try {
        Message.hasOne(Response)
        // Solo cuando se requiera actualizar el modelo
        // await sequelize.sync({ alter: true }) 

        // Cuando el modelo es estable
        await sequelize.sync()
    }
    catch(error){
        console.error(error)
        sequelize.close()
    }
}

const closeConnection = async () => {
    try {
        await sequelize.close()
    }
    catch(error) { console.log("No se pudo conectar con la base de datos") }
}

const saveMessage = async (msg) => {
    try {
        const ms = Message.build({message:msg})
        await ms.save()
        return ms
    }
    catch(error) { console.error(error) }
}
const saveResponse = async (msg_id, res) => {
    try {
        const rp = Response.build(
            {
                MessageId: msg_id,
                response: res
            })
        await rp.save()
        return rp
    }
    catch(error) { console.error(error) }
}

exports.saveMessage = saveMessage
exports.saveResponse = saveResponse

exports.startConnection = startConnection
exports.closeConnection = closeConnection
