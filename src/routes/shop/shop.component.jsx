import { useContext } from "react"

import { ProductsContext } from "../../utils/contexts/products.context"
import ProductCard from "../../components/product-card/product-card.component"

import "./shop.styles.scss"

// import SHOP_DATA from "../../shop-data.json"

const Shop = () => {
  // Fech the products from the context
  const { products } = useContext(ProductsContext)

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Shop
