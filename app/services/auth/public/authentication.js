import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const provider = new GoogleAuthProvider();
const auth = getAuth()

const login = () => {
    signInWithPopup(auth, provider)
    .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        console.log(user)
    })
    .catch(err=>console.error(err))
}

exports.login = login
