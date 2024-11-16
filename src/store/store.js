import { compose, createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // local storage on browser

import logger from "redux-logger"
// import { loggerMiddleware } from "./middleware/logger" // our own implementation of middleware logger

import { rootReducer } from "./root-reducer"

// run logger only in development mode
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean // remove any falsy values (ie if we're in 'production' mode, middlleware will be an empty array)
)

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const persistConfig = {
  key: "root", // persist whole state at root level
  storage,
  blacklist: ["user"], // we don't want to persist user as it's handled by firebase, and don't won't weird bugs
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)))
export const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleWares)) //passing in multiple middlewares and applying them
)

//
export const persistor = persistStore(store)
