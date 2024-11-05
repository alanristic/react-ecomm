import "./directory.styles.scss"
import CategoryItem from "../category-item/category-item.component"

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  )
}

export default Directory
