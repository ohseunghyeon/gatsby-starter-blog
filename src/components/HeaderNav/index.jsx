import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import "./index.scss"

const Nav = ({ location }) => {
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      categories: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  // make category array
  const categories = [];
  data.categories.group
    .reduce((catMap, g) => {
      g.fieldValue
        .split('/')
        .reduce((fullCat, categoryChunk, i, a) => {
          fullCat += `${i === 0 ? '' : '/'}${categoryChunk}`
          catMap.set(fullCat, (catMap.get(fullCat) || 0) + g.totalCount)
          return fullCat
        }, '')
      return catMap;
    }, new Map())
    .forEach((count, cat) => categories.push({
      slug: cat,
      cat: cat.split('/').pop(),
      count,
      depth: cat.split('/').length - 1
    }))

  const slug = location.pathname.slice(1);
  const currentCategory = categories.reduce((current, next) => {
    if (~slug.indexOf(next.slug)) return next.slug;
    return current;
  }, '')

  return (
    <nav className="nav" role="navigation">
      <ol className="nav-links">
        {categories.map(({ slug, cat, count, depth }) => (
          <li
            className={`nav-link ${depth ? 'sub' : ''} ${currentCategory === slug ? 'current' : ''}`}
            key={cat}
          >
            <Link to={`/${slug}`}>
              {cat}
              <small>({count})</small>
            </Link>
          </li>
        ))}
      </ol>
    </nav >
  )
}

export default Nav