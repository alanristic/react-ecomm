import { Fragment } from "react"
import { useSelector } from "react-redux"

import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/categories/category.selector"

// import { CategoriesContext } from "../../utils/contexts/categories.context"
import CategoryPreview from "../../components/category-preview/category-preview.component"
import Spinner from "../../components/spinner/spinner.component"

import "./categories-preview.styles.scss"

const CategoriesPreview = () => {
  // Fech the products from the context
  // const { categoriesMap } = useContext(CategoriesContext)

  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectIsCategoriesLoading)

  return (
    <Fragment>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={(title, products)}
            />
          )
        })
      )}
    </Fragment>
  )
}

export default CategoriesPreview
