import "./cart-item.styles.scss"
import { useContext } from "react"
import { CartContext } from "../../utils/contexts/cart.context"

const CartItem = ({ cartItem }) => {
  const { removeItemFromCart } = useContext(CartContext)

  const clearItem = () => removeItemFromCart(cartItem)

  return (
    <div className="cart-item-container">
      <img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
      <div className="item-details">
        <span className="name">{cartItem.name}</span>
        <span className="price">
          {cartItem.quantity} x ${cartItem.price}
        </span>
      </div>
      <button onClick={clearItem}>Remove</button>
    </div>
  )
}

export default CartItem
