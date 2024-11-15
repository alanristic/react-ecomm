import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
  currentUser: null,
}

// export const UserContext = createContext({
//   currentUser: null, // tells us if the user is signed in or not (if we do have don't have a user object)
//   setCurrentUser: null, // a function that sets the currentUser
// })

export const userReducer = (state = INITIAL_STATE, action) => {
  //   console.log("dispatched() from userReducer")
  //   console.log(action)
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // <<< I'm not modifying this in this case, but include it in the return anyway
        currentUser: payload, // <<< I'm modifying this in this case
      }
    default:
      return state // we return the state as is if the action type is not recognized (ie we don't care about it)
  }
}
