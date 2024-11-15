import { createContext, useEffect, useReducer } from "react"

import {
  onAuthStateChangedListener,
  createUserProfileDocument,
} from "../firebase/firebase.utils"

export const UserContext = createContext({
  currentUser: null, // tells us if the user is signed in or not (if we do have don't have a user object)
  setCurrentUser: null, // a function that sets the currentUser
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state, action) => {
  console.log("dispatched() from userReducer")
  console.log(action)
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // <<< I'm not modifying this in this case, but include it in the return anyway
        currentUser: payload, // <<< I'm modifying this in this case
      }
    default:
      throw new Error(`Unsupported action type: ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

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
  // const [currentUser, setCurrentUser] = useState(null)
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
  console.log(currentUser)

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
