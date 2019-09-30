import React from "react";
import { Link } from "gatsby"

import './index.scss'
import { rhythm, scale } from "../../utils/typography"


const Header = (props) => {
  const { title } = props

  return (
    <header
      className="header"
      style={{
        ...scale(1),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
    >
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