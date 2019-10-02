import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Category = styled.li`
  &.sub {
    ::before {
      content: "-";
      margin: 0 5px;
    }
  }
`

const Nav = () => {
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

  console.log(categories);

  return (
    <nav className="nav" role="navigation">
      <ol className="nav-links">
        {categories.map(({ slug, cat, count, depth }) => (
          <Category
            className={`${depth ? 'sub' : ''}`}
            key={cat}
          >
            <Link to={`/${slug}`}>
              {cat}
              <small>({count})</small>
            </Link>
          </Category>
        ))}
      </ol>
    </nav >
  )
}

export default Nav