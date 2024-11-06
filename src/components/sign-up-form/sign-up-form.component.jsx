import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import {
  createUserProfileDocument,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"

import "./sign-up-form.styles.scss"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields) // form fields state management
  const { displayName, email, password, confirmPassword } = formFields

  //   console.log(formFields)

  /**
   * Resets the form fields to their default values.
   */
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
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

    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }

    try {
      //TODO:  check if this returns undefined (it should return the user object)
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserProfileDocument(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use")
      } else {
        console.log("user creation encountered an error", error)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <span>Sign Up</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
