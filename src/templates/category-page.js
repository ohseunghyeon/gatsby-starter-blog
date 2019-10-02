import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostListTitle from "../components/PostListTitle"
import PostFrontmatter from "../components/PostFrontmatter"
import { rhythm } from "../utils/typography"

const CategoryPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const category = pageContext.category.slice(2, -1)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={category} />
      <PostListTitle title={category} />
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
              <PostFrontmatter
                date={node.frontmatter.date}
                timeToRead={node.timeToRead}
              />
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
