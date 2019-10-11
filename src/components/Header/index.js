import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import Headroom from "headroom.js";
import Hamburger from "./HeaderHamburger";
import Nav from "./HeaderNav";
import Toggle from './Toggle';

import "./index.scss";

const Header = ({ title, location }) => {
  const refHeader = useRef();
  const headroom = useRef();

  useEffect(() => {
    headroom.current = new Headroom(refHeader.current);
    headroom.current.init();

    return () => headroom.current.destroy();
  }, []);

  return (
    <header ref={refHeader} className="header">
      <Hamburger />
      <Link
        style={{ color: 'var(--textTitle)' }}
        className="header-logo"
        to={`/`}
      >
        {title}
      </Link>
      <Nav location={location} />
      <Toggle />
    </header>
  )
}

export default Header;