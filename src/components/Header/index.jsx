import React from "react";
import { Link } from "gatsby"

import "./index.scss"
import Hamburger from "../HeaderHamburger"
import Nav from "../HeaderNav"

const Header = ({ title, location }) => {
  return (
    <header className="header">
      <Hamburger />
      <Link className="header-logo" to={`/`}>{title}</Link>
      <Nav location={location} />
    </header>
  )
}

export default Header