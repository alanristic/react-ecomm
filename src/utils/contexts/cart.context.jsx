import { createContext, useState } from "react"

import PRODUCTS from "../../cart-data.json" // temporary data

export const CartContext = createContext({
  isCartOpen: false, // default value
  setIsCartOpen: () => {}, // points to an empty function
  products: [],
})

/**
 * TODO: Add JSDoc
 */
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const value = { isCartOpen, setIsCartOpen }

  // const [products] = useState(PRODUCTS)
  // const value = { products }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
