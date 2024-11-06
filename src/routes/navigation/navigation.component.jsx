import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"

import { UserContext } from "../../utils/contexts/user.context"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss"

const Navigation = () => {
  const { currentUser } = useContext(UserContext) // here we want the VALUE not setter

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/auth" onClick={signOutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
