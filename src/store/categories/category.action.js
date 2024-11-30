import { CATEGORIES_ACTION_TYPES } from "./category.types"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

/**
 * Set categories action
 *
 * @param {Array} categories
 * @returns
 */
export const setCategories = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
  }
}

/**
 * Start action for fetching categories
 *
 * @returns {Object} action
 */
export const fetchCategoriesStart = () => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  }
}

/**
 * Success action for fetching categories
 *
 * @param {*} categories
 * @returns
 */
export const fetchCategoriesSuccess = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  }
}

/**
 * Failure action for fetching categories
 *
 * @param {*} error
 * @returns
 */
export const fetchCategoriesFailure = (error) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
    payload: error, // error message as a payload
  }
}

/**
 * Thunk action to fetch categories
 *
 * This is 'action-creator' function that returns a function that takes 'dispatch' and 'getState' as arguments
 */
export const fetchCategoriesAsync = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCategoriesStart()) // we're dispatching 'start' action

    try {
      // const response = await fetch("https://fakestoreapi.com/products/categories")
      const categories = await getCategoriesAndDocuments("categories")
      dispatch(fetchCategoriesSuccess(categories))
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message))
    }
  }
}
