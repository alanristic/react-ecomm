import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import {
  onAuthStateChangedListener,
  createUserProfileDocument,
} from "./utils/firebase/firebase.utils"

import Navigation from "./routes/navigation/navigation.component"
import Home from "./routes/home/home.component"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component"
import Checkout from "./routes/checkout/checkout.component"

import { setCurrentUser } from "./store/user/user.action"

// const Shop = () => {
//   return <h1>Shop Page</h1>
// }

const App = () => {
  const dispatch = useDispatch() //it's ever only once created and then reused (Redux stuff)

  // REFACTOR 01: we need user state in the App component
  // On mount, subscribe to auth changes (runs only once)
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // try creating user in the database if it doesn't exist
        // (fnc is safe to call multiple times for the same user as it checks if the user already exists in the database)
        createUserProfileDocument(user)
      }
      dispatch(setCurrentUser(user)) // 'user' (if user signed in) OR 'null' (if user is signed out)
    })
    return unsubscribe // unsubscribe from the listener when the component unmounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  )
}

export default App
