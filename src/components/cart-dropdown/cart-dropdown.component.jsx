import { useContext } from "react"

import "./cart-dropdown.styles.scss"

// Contexts
import { CartContext } from "../../utils/contexts/cart.context"

// Components
import Button from "../button/button.component"

const CartDropdown = () => {
  // Fetch the products from the context
  const { products } = useContext(CartContext)

  //   console.log("DBG: CartDropdown render()", products)

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      {/* {products.map((product) => (
        <div className="cart-items" key={product.id}>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <span>{product.quantity}</span>
        </div>
      ))} */}
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
