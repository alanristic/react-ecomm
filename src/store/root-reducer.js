import { combineReducers } from "redux"

import { userReducer } from "./user/user.reducer"

// Combine all individual reducers here
export const rootReducer = combineReducers({
  user: userReducer,
  // Add your reducers here
})
