import { createContext, useState, useEffect } from "react"

// import PRODUCTS from "../../shop-data.json" // temporary data in JSON format
// import SHOP_DATA from "../../shop-data.js" // temporary data in array format from JS file

import {
  /*addCollectionAndDocuments,*/
  getCategoriesAndDocuments, // our helper function for fetching data from Firebase
} from "../firebase/firebase.utils.js"

export const CategoriesContext = createContext({
  categoriesMap: {},
})

/**
 * TODO: Add JSDoc
 */
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // On mount, add complete BATCH of test products (just run once)
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA)
  // }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
      console.log(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = { categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
