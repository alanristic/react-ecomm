import { CART_ACTION_TYPES } from "./cart.types"

// ---------------------------------------------------------------------------
// Utility functions for the cart: add, remove, clear
// ---------------------------------------------------------------------------

/**
 * Add/Increment logic for the cart items
 *
 * NOTE: This function is passed down to the context provider
 * and decides if the product is already in the cart (in which case increases Quantity of existing product)
 * or not (and adds new Product to the Cart).
 *
 * @param {*} cartItems
 * @param {*} productToAdd
 * @returns
 */
const addCartItems = (cartItems, productToAdd) => {
  // Check/find if the product is already in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  // If the product is already (if found) in the cart, increase the quantity
  if (existingCartItem) {
    return cartItems.map(
      (cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // increase the quantity for matched existing product
          : cartItem // return the existing product as is (dont't change it)
    )
  }

  // If the product is not in the cart, add the product to the cart,
  // set the quantity to 1 and return the updated cart array of items
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

/**
 * Remove/Decrement logic for the cart items
 *
 * NOTE: This function is passed down to the context provider
 * and decides if the product is already in the cart (in which case decreases Quantity of existing product)
 * or not (and removes the Product from the Cart if quantity is 1).
 *
 * @param {*} cartItems
 * @param {*} productToRemove
 * @returns
 */
const removeCartItem = (cartItems, productToRemove) => {
  // Check/find if the product is already in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  )

  // If we only had 1 product in cart, remove the product from the cart completly
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }

  // If the product is already (if found) in the cart (and more than 1), decrease the quantity
  return cartItems.map(
    (cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 } // decrease the quantity for matched existing product
        : cartItem // return the existing product as is (dont't change it)
  )
}

/**
 * TODO: write jsDoc
 *
 * @param {*} cartItems
 * @param {*} productToRemove
 * @returns
 */
const clearCartItem = (cartItems, productToClear) => {
  // If we only had 1 product in cart, remove the product from the cart completly
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}

// ---------------------------------------------------------------------------
// 'ACTION CREATORS' functions for the cart: add, remove, clear and toggle
//  NOTE: they depend on utility functions
// ---------------------------------------------------------------------------

export const setIsCartOpen = (isCartOpen) => ({
  // receives a boolean value
  type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
  payload: isCartOpen,
})

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItems(cartItems, productToAdd)
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems, // pass the new cart items to the reducer
  }
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove)
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems, // pass the new cart items to the reducer
  }
}

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear)
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems, // pass the new cart items to the reducer
  }
}
