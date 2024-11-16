import { compose, createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // local storage on browser
import logger from "redux-logger"

import { rootReducer } from "./root-reducer"

const middleWares = [logger]

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
  compose(applyMiddleware(...middleWares)) //passing in multiple middlewares and applying them
)

//
export const persistor = persistStore(store)
