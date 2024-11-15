import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectCategoriesMap } from "../../store/categories/category.selector"

import "./category.styles.scss"
import ProductCard from "../../components/product-card/product-card.component"

const Category = () => {
  const { category } = useParams() // we can access the category parameter(s) from the URL
  // const { categoriesMap } = useContext(CategoriesContext)

  const categoriesMap = useSelector(selectCategoriesMap)

  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
    // console.log("DBG: category....", category)
    // console.log("DBG: useEffect()....", categoriesMap)
  }, [category, categoriesMap]) // only update once any of those two changes

  return (
    <>
      <h2 className="cateogry-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products && // if products is not null (remember, we're using async fetch from Firebase)
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  )
}

export default Category
