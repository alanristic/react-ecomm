import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

const SignIn = () => {
  /**
   * Popup sign-in with Google
   */
  const logGoogleUserWithPopup = async () => {
    try {
      const { user } = await signInWithGooglePopup() // opens a popup window with Google sign-in
      const userDocRef = await createUserProfileDocument(user)
      console.log("User document reference:", userDocRef)
    } catch (error) {
      console.error("Error signing in with popup:", error)
    }
  }

  return (
    <div className="sign-in">
      <h2>Sign-in endpoint</h2>
      <button onClick={logGoogleUserWithPopup}>
        Sign-in with Google Popup
      </button>
      <SignUpForm></SignUpForm>
    </div>
  )
}

export default SignIn
