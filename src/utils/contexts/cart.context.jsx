import { createContext, useState, useEffect } from "react"

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

// Export the context
export const CartContext = createContext({
  isCartOpen: false, // default value
  setIsCartOpen: () => {}, // points to an empty function
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
})

/**
 * Context provider for the cart
 *
 * @param {*} children - The child components that will have access to the cart context
 * @returns {JSX.Element} The cart context provider with the provided children
 */
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Calculate the total number of items in the cart
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    setCartCount(newCartCount) // set new cart count
  }, [cartItems]) // runs every time when the 'cartItems' change

  /**
   * Add product to the cart
   *
   * @param {*} productToAdd
   */
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  /**
   * Remove product from the cart
   *
   * @param {*} productToRemove
   */
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  // Exposing the values to the children components
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart, // Add removeItemFromCart to the context value
    cartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
