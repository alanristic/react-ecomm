import "./categories-preview.styles.scss"

import { useContext, Fragment } from "react"

import { CategoriesContext } from "../../utils/contexts/categories.context"
import CategoryPreview from "../../components/category-preview/category-preview.component"

import "./categories-preview.styles.scss"

const CategoriesPreview = () => {
  // Fech the products from the context
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title]
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={(title, products)}
          />
        )
      })}
    </Fragment>
  )
}

export default CategoriesPreview
