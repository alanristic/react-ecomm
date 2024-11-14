import { Routes, Route } from "react-router-dom"

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import "./shop.styles.scss"

// import SHOP_DATA from "../../shop-data.json"

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=":category" element={<Category></Category>}></Route>
    </Routes>
  )
}

export default Shop
