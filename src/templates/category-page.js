import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatReadingTime } from "../utils/helpers"

const CategoryPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const category = pageContext.category.slice(2, -1)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={category} />
      <Bio />

      <h2
        style={{
          textTransform: 'uppercase',
          marginTop: rhythm(-1 / 2),
        }}
      >
        {category}
      </h2>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {` • ${formatReadingTime(node.timeToRead)}`}
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default CategoryPage

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {category: {regex: $category }}}
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
