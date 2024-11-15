import { combineReducers } from "redux"

import { userReducer } from "./user/user.reducer"
import { categoriesReducer } from "./categories/category.reducer"
import { cartReducer } from "./cart/cart.reducer"

// Combine all individual reducers here
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  // Add your reducers here
})
