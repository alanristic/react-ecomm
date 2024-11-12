import { useContext } from "react"

import Button from "../button/button.component"
import { CartContext } from "../../utils/contexts/cart.context"

import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product
  const { addItemToCart } = useContext(CartContext) // enable the addItemToCart function from the CartContext (aka to use it in this component)

  // Reaedability optimization (moving the function out of JSX)
  const addProductToCart = () => {
    addItemToCart(product)
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard
