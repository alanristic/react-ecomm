import { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"

import CartIcon from "../../components/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

// import { UserContext } from "../../utils/contexts/user.context"
// import { CartContext } from "../../utils/contexts/cart.context"
import { selectIsCartOpen } from "../../store/cart/cart.selector"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase/firebase.utils"

// import "./navigation.styles.scss"
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser) // this is a hook that allows us to access the state in the redux store
  // const { isCartOpen } = useContext(CartContext) // here we want the VALUE not setter
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink className="nav-link" to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink className="nav-link" to="/auth" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink className="nav-link" to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
