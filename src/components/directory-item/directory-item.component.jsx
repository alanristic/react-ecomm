import "./directory-item.styles.jsx"

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles.jsx"

const DirectoryItem = ({ title, imageUrl }) => (
  <DirectoryItemContainer>
    <BackgroundImage imageUrl={imageUrl} />
    <Body>
      <h2>{title}</h2>
      <p>Shop Now!</p>
    </Body>
  </DirectoryItemContainer>
)
export default DirectoryItem
