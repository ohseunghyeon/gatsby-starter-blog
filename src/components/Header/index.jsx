import React, { useEffect, useRef } from "react";
import { Link } from "gatsby"
import Headroom from "headroom.js"

import "./index.scss"
import Hamburger from "../HeaderHamburger"
import Nav from "../HeaderNav"

const Header = ({ title, location }) => {
  const refHeader = useRef();
  const headroom = useRef();

  useEffect(() => {
    headroom.current = new Headroom(refHeader.current);
    headroom.current.init();
    return () => headroom.current.destroy();
  }, [])

  return (
    <header ref={refHeader} className="header">
      <Hamburger />
      <Link className="header-logo" to={`/`}>{title}</Link>
      <Nav location={location} />
    </header>
  )
}

export default Header