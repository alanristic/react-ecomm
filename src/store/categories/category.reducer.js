import { CATEGORIES_ACTION_TYPES } from "./category.types"

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, // need to konw state #Thunk
  error: null, // reducer should be aware of errors occuring #Thunk
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true, // set state to loading on 'start' of fetching
      }
    // case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: // we're setting categories on 'success' of fetching
      return {
        ...state,
        categories: payload,
        isLoading: false, // set state to not loading on 'success' of fetching
      }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false, // set state to not loading on 'failure' of fetching
        error: payload, // set error message on 'failure' of fetching
      }
    default:
      return state
  }
}
