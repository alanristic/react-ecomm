import { useContext } from "react"

import { CartContext } from "../utils/contexts/cart.context"

// import "./cart-icon.styles.jsx"
import {
  ShoppingIcon,
  CartIconContainer,
  CartIconCount,
} from "./cart-icon.styles"

const CartIcon = () => {
  // set if cart is open/closed
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen) // toggle the value (aka with Inverse value)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon></ShoppingIcon>
      <CartIconCount>{cartCount}</CartIconCount>
    </CartIconContainer>
  )
}

export default CartIcon
