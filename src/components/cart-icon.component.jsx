import { useContext } from "react"
import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg"

import { CartContext } from "../utils/contexts/cart.context"

import "./cart-icon.styles.scss"

const CartIcon = () => {
  // set if cart is open/closed
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen) // toggle the value (aka with Inverse value)

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon
