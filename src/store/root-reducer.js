import { combineReducers } from "redux"

import { userReducer } from "./user/user.reducer"
import { categoriesReducer } from "./categories/category.reducer"

// Combine all individual reducers here
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  // Add your reducers here
})
