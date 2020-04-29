const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slug")
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const createBlogPages = graphql(
    `
      {
        allGhostPost(sort: { order: DESC, fields: [published_at] }) {
          nodes {
            slug
            title
            html
            published_at
            primary_tag {
              id
              slug
            }
            authors {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    const posts = result.data.allGhostPost.nodes
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)

    // Create blog lists
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blog-list.jsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    // Create blog posts
    result.data.allGhostPost.nodes.forEach(post => {
      createPage({
        path: post.slug,
        component: path.resolve(`./src/templates/blog-post.jsx`),
        context: {
          slug: post.slug,
        },
      })
    })
  })

  return Promise.all([createBlogPages])
}
