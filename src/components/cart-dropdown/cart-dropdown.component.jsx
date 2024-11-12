import { useContext } from "react"

import "./cart-dropdown.styles.scss"

// Contexts
import { CartContext } from "../../utils/contexts/cart.context"

// Components
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"

const CartDropdown = () => {
  // Fetch the products from the context
  const { cartItems } = useContext(CartContext)

  //   console.log("DBG: CartDropdown render()", products)

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button to="/">GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
