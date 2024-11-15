import { useDispatch, useSelector } from "react-redux"
// import { CartContext } from "../utils/contexts/cart.context"

import { selectCartCount, selectIsCartOpen } from "../store/cart/cart.selector"
import { setIsCartOpen } from "../store/cart/cart.action"

// import "./cart-icon.styles.jsx"
import {
  ShoppingIcon,
  CartIconContainer,
  CartIconCount,
} from "./cart-icon.styles"

const CartIcon = () => {
  // set if cart is open/closed
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const dispatch = useDispatch()

  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen)) // toggle the value (aka with Inverse value)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon></ShoppingIcon>
      <CartIconCount>{cartCount}</CartIconCount>
    </CartIconContainer>
  )
}

export default CartIcon
