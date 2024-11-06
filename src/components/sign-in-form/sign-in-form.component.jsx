import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import {
  // createUserProfileDocument,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword, // our custom method to sign in a user with email and password
} from "../../utils/firebase/firebase.utils"

import "./sign-in-form.styles.scss"

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields) // form fields state management
  const { email, password } = formFields

  /**
   * Resets the form fields to their default values.
   */
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  /**
   * Popup sign-in with Google
   */
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup() // opens a popup window with Google sign-in
    } catch (error) {
      console.error("Error signing in with popup:", error)
    }
  }

  /**
   * Handles the change event for form inputs.
   * Updates the formFields state with the new value.
   *
   * @param {Object} event - The event object from the input change.
   * @returns {void}
   */
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  /**
   * Handles the submit event for form.
   * Updates the formFields state with the new value.
   *
   * @param {Object} event - The event object from the input change.
   * @returns {void}
   */
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found. Create an account first to sign in.")
          break
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.")
          break
        default:
          console.log("user sign-in encountered an error", error)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
