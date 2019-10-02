import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import ListTitle from "../components/ListTitle"
import { rhythm } from "../utils/typography"
import { formatReadingTime } from "../utils/helpers"

const CategoryLink = styled(Link)`
  opacity: 0.75;
  ::before {
    content: " • ";
  }
  @media screen and (max-width: 48em) {
    ::before {
      display: none;
    }
    display: block;
  }
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <ListTitle title="All Posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3 style={{ marginBottom: rhythm(1 / 4) }}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {` • ${formatReadingTime(node.timeToRead)}`}
                <CategoryLink to={`/${node.frontmatter.category}`}>
                  {node.frontmatter.category}
                </CategoryLink>
              </small>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

// filter: {frontmatter: {category: {regex: "/^(?!algorithm)/" }}}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
          }
        }
      }
    }
  }
`
