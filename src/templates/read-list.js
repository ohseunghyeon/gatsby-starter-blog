import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostListTitle from "../components/PostListTitle"
import { rhythm } from "../utils/typography"

const ReadList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const category = pageContext.category.slice(2, -1)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={category} />
      <PostListTitle title={category} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const link = node.frontmatter.link;

        return (
          <article key={node.fields.slug}>
            <header>
              <h4 style={{ marginBottom: rhythm(1 / 4) }}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h4>
              <section>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                /> */}
                <p
                  style={{ fontSize: rhythm(1 / 2) }}
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.date }}
                />
              </section>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default ReadList

export const pageQuery = graphql`
  query ReadList($category: String) {
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
            creator
            link
          }
        }
      }
    }
  }
`
