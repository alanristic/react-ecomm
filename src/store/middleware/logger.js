export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }

  console.log("Action: ", action.type)
  console.log("Payload: ", action.payload)
  console.log("Current State: ", store.getState())

  next(action)

  console.log("Next State: ", store.getState())
}
