import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby"

import "./index.scss"
import Hamburger from "../HeaderHamburger"

const Header = (props) => {
  const { title } = props

  const data = useStaticQuery(graphql`
    query CategoryQuery {
      categories: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)

  const categories = data.categories.group.map(g => g.fieldValue);

  return (
    <header className="header">
      <Hamburger />
      <Link className="header-logo" to={`/`}>{title}</Link>
      <nav className="nav" role="navigation">
        <ol className="nav-links">
          {categories.map(c => (
            <li key={c}>
              <Link to={`/${c}`}>{c}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}

export default Header