import { compose, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"

import { rootReducer } from "./root-reducer"

const middleWares = [logger]

// export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)))
export const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(...middleWares)) //passing in multiple middlewares and applying them
)
