import { useSelector, useDispatch } from "react-redux"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
// import { CartContext } from "../../utils/contexts/cart.context"

import { addItemToCart } from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector"

import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product
  // const { addItemToCart } = useContext(CartContext) // enable the addItemToCart function from the CartContext (aka to use it in this component)
  const cartItems = useSelector(selectCartItems)

  // const addItemToCart = useSelector(addItemToCart) // enable the addItemToCart function from the CartContext (aka to use it in this component)
  const dispatch = useDispatch()

  // Reaedability optimization (moving the function out of JSX)
  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product))
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard
