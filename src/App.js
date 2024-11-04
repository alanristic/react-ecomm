import "./categories.style.scss"

const App = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      description: "Category description goes here.",
    },
    {
      id: 2,
      title: "Jackets",
      description: "Category description goes here.",
    },
    {
      id: 3,
      title: "Sneakers",
      description: "Category description goes here.",
    },
  ]

  return (
    <div className="categories-container">
      {categories.map(({ id, title, description }) => (
        <div className="category-container">
          <div className="category-image"></div>
          <div className="category-body">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Shop Now!</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
