import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    console.log(user)
    const userDocRef = await createUserProfileDocument(user)
  }

  return (
    <div className="sign-in">
      <h2>Sign-in endpoint</h2>
      <button onClick={logGoogleUser}>Sign-in with Google Popup</button>
    </div>
  )
}

export default SignIn
