import { createContext, useState, useEffect } from "react"

import {
  onAuthStateChangedListener,
  createUserProfileDocument,
} from "../firebase/firebase.utils"

export const UserContext = createContext({
  currentUser: null, // tells us if the user is signed in or not (if we do have don't have a user object)
  setCurrentUser: null, // a function that sets the currentUser
})

/**
 * UserProvider component that provides the UserContext to its children.
 *
 * NOTE 01: This is simply 'alias' component that wraps the children with the UserContext.Provider (provides the UserContext to its children).
 *
 * NOTE 02: This wil trigger RE-RENDER of all the children components that are wrapped by this component.
 *
 * @param {Object} param0 - The props object.
 * @param {ReactNode} param0.children - The child components that will have access to the UserContext.
 * @returns {JSX.Element} The UserContext.Provider component with children.
 */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  // On mount, subscribe to auth changes (runs only once)
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user)

      if (user) {
        // try creating user in the database if it doesn't exist
        // (fnc is safe to call multiple times for the same user as it checks if the user already exists in the database)
        createUserProfileDocument(user)
      }

      setCurrentUser(user) // 'user' (if user signed in) OR 'null' (if user is signed out)
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
