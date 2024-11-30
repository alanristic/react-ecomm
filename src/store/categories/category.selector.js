import { createSelector } from "reselect"

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories // only runs if the categories reducer changes
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category // destructuring actual data from the document snapshot
      acc[title.toLowerCase()] = items // so each catgegory key gets an array of items (ie 'hats': [...], 'jackets': [...])
      return acc
    }, {})
)

/**
 * Determine if categories are loading
 */
export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
)
