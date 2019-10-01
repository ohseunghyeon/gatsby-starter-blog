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
      <nav className="top-nav">
        <Hamburger />
        <Link className="header-logo" to={`/`}>{title}</Link>
        {/* <ol className="nav-links">
          {categories.map(c => (
            <li key={c}>
              <Link to={`/${c}`}>
                {c}
              </Link>
            </li>
          ))}
        </ol> */}
      </nav>
      <nav className="left-sidrbar--sticky-container" role="navigation">
        <ol className="nav-links">
          <li style={{
            marginBottom: `12px`,
            fontSize: `2rem`
          }}>
            <Link className="header-logo" to={`/`}>{title}</Link>
          </li>
          {categories.map(c => (
            <li key={c}>
              <Link to={`/${c}`}>
                {c}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}

export default Header