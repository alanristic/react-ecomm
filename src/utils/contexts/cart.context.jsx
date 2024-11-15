import { createContext, useReducer } from "react"

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

// Export the context
export const CartContext = createContext({
  isCartOpen: false, // default value
  setIsCartOpen: () => {}, // points to an empty function
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

const CART_ACTION_TYPES = {
  // ADD_ITEM: "ADD_ITEM",
  // REMOVE_ITEM: "REMOVE_ITEM",
  // CLEAR_ITEM: "CLEAR_ITEM",
  SET_CART_ITEMS: "SET_CART_ITEMS", // <<< OK
  TOGGLE_CART: "TOGGLE_CART",
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unsupported action type: ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

/**
 * Context provider for the cart
 *
 * @param {*} children - The child components that will have access to the cart context
 * @returns {JSX.Element} The cart context provider with the provided children
 */
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  // ---------------------------------------------------------------------------
  // 'Action-creator' functions for the cart: add, remove, clear and toggle
  // ---------------------------------------------------------------------------

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems) // pass the new cart items to the reducer
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems) // pass the new cart items to the reducer
  }

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    updateCartItemsReducer(newCartItems) // pass the new cart items to the reducer
  }

  const toggleCart = () => {
    // Dispacth reducer with new cart items, total and count
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_CART,
      payload: {
        isCartOpen: !isCartOpen,
      },
    })
  }

  // ---------------------------------------------------------------------------
  // 'Context-setter' function for the cart: update cart items, total and count
  // ---------------------------------------------------------------------------

  // Joint function for updating cart items, total and count)
  //  - we wrote it this way b/c we need to update all 3 values at once
  const updateCartItemsReducer = (newCartItems) => {
    // UPDATE quantity of products in cart
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )

    // UPDATE total price of products in cart
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )

    // Dispacth reducer with new cart items, total and count
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    })
  }

  const value = {
    isCartOpen: isCartOpen,
    cartItems: cartItems,
    cartCount: cartCount,
    cartTotal: cartTotal,
    setIsCartOpen: toggleCart,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
