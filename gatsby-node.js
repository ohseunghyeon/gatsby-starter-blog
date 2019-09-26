const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryPage = path.resolve(`./src/templates/category-page.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages and category pages.
  const posts = result.data.allMarkdownRemark.edges

  // Collect posts by their categories
  // Next, previous를 카테고리 내에서 식별
  const postsByCategory = new Map();
  posts.forEach((post) => {
    const category = post.node.frontmatter.category;

    if (category) {
      if (!postsByCategory.has(category)) {
        postsByCategory.set(category, []);
      }
      postsByCategory.get(category).push(post);
    } else {
      reporter.warn(`다음 파일에 카테고리가 없습니다. ${post.node.frontmatter.title}`)
    }
  })

  // Create blog posts pages.
  postsByCategory.forEach(
    posts => posts.forEach(
      (post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      }
    )
  )

  // Create category pages.
  postsByCategory.forEach(
    (_, fullCategory) => {
      const splitedCategory = fullCategory.split('/');

      let category = ''
      while (splitedCategory.length) {
        if (category) category += '/'

        category += splitedCategory.shift();

        createPage({
          path: `/${category}`,
          component: categoryPage,
          context: {
            category: `^/${category}/`
          }
        })
      }
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
