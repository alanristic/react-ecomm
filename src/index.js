import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import App from "./App"
// import { UserProvider } from "./utils/contexts/user.context"
// import { CategoriesProvider } from "./utils/contexts/categories.context"
// import { CartProvider } from "./utils/contexts/cart.context"

import { store, persistor } from "./store/store" // Redux store

import reportWebVitals from "./reportWebVitals"

import "./index.scss"

/**
 * NOTE 01: We want <CategoriesProvider> to have access to usres's data (currentUser/geoLocation)
 * so we wrap it with <UserProvider>.
 */
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartProvider> */}
          <App />
          {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
          {/* </UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
