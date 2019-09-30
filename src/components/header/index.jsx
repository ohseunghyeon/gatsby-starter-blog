import React from "react";
import { Link } from "gatsby"

import './index.scss'
import Bio from "../bio"

const Header = (props) => {
  const { title } = props

  return (
    <header className="header">
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </header>
  )
}

export default Header