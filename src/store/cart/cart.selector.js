import { createSelector } from "reselect"

const selectCartReducer = (state) => state.cart

// memoized selector - cartItems
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

// memoized selector - isCartOpen
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)

// memoized selector - cartCount
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

// memoized selector - cartTotal
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
)
