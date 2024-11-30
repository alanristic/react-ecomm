import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesAsync } from "../../store/categories/category.action"

import "./shop.styles.scss"

// import SHOP_DATA from "../../shop-data.json"

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesMap = () => {
      dispatch(fetchCategoriesAsync())
    }
    getCategoriesMap() // run immedietly after Component mounts
  }, [dispatch]) // run only once

  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=":category" element={<Category></Category>}></Route>
    </Routes>
  )
}

export default Shop
