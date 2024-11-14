import { useContext } from "react"
import { useNavigate } from "react-router-dom"

// import "./cart-dropdown.styles.jsx"
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles"

// Contexts
import { CartContext } from "../../utils/contexts/cart.context"

// Components
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"

const CartDropdown = () => {
  // Fetch the products from the context
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate("/checkout")
  }

  //   console.log("DBG: CartDropdown render()", products)

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
