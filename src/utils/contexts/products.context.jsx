import { createContext, useState, useEffect } from "react"

import PRODUCTS from "../../shop-data.json" // temporary data

export const ProductsContext = createContext({
  products: [],
})

/**
 * TODO: Add JSDoc
 */
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS)
  // const value = { products, setProducts }
  const value = { products }

  // On mount, fetch products
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((products) => {
    //   console.log(products)
    //   if (user) {
    //     // try creating user in the database if it doesn't exist
    //     // (fnc is safe to call multiple times for the same user as it checks if the user already exists in the database)
    //     createUserProfileDocument(user)
    //   }
    //   setCurrentUser(user) // 'user' (if user signed in) OR 'null' (if user is signed out)
    // })
    // return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
