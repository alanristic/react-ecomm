import DirectoryItem from "../directory-item/directory-item.component"

// import "./directory.styles.jsx"
import { DirectoryMenuContainer } from "./directory.styles"

const Directory = ({ categories }) => {
  return (
    <DirectoryMenuContainer>
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </DirectoryMenuContainer>
  )
}

export default Directory
