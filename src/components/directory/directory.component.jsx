import "./directory.styles.scss"
import DirectoryItem from "../directory-item/directory-item.component"

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  )
}

export default Directory
