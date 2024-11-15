import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { setCategories } from "../../store/categories/category.action"

import "./shop.styles.scss"

// import SHOP_DATA from "../../shop-data.json"

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesMap = async () => {
      // const categoryMap = await getCategoriesAndDocuments()
      const categoriesArray = await getCategoriesAndDocuments()
      // console.log(categoriesArray)
      dispatch(setCategories(categoriesArray))
    }
    getCategoriesMap()
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=":category" element={<Category></Category>}></Route>
    </Routes>
  )
}

export default Shop
