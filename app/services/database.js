require('dotenv').config()
const { serverTimestamp, getFirestore, doc, updateDoc, addDoc, collection, getDoc} = require('firebase/firestore')
const { app } = require('./firebaseSetup')

const db = getFirestore(app)

async function saveMessage(message, sugerencia) {
    const data = { mensaje: message, sugerencia: sugerencia, fecha_envio: serverTimestamp() }
    const res = await addDoc(collection(db, 'consultas'), data)
    return {id:res.id, data:data}
}

async function saveResponse(msg_id, response) {
    const data = { respuesta: response, fecha_respuesta: serverTimestamp()}
    const docRef = doc(db, 'consultas', msg_id)
    const res = await updateDoc(docRef, data)
    return {id:docRef.id, data:data}
}

exports.saveMessage = saveMessage
exports.saveResponse = saveResponse