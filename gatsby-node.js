const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slug")
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)

    if (fileNode.dir.includes("content/posts/")) {
      const filename = createFilePath({ node, getNode, basePath: `posts` })

      const postName = filename
      const [, date, title] = postName
        .split("/")[1]
        .match(/^([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)$/)

      const slug = `/blog/${slugify([date].join("-"), "/")}/${title}/`

      createNodeField({ node, name: `type`, value: "blog-post" })
      createNodeField({ node, name: `slug`, value: slug })
      createNodeField({ node, name: `date`, value: date })
      createNodeField({ node, name: `path`, value: fileNode.relativePath })
    } else {
      const filename = createFilePath({ node, getNode })
      createNodeField({ node, name: `slug`, value: filename })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const createBlogPages = graphql(
    `
      {
        allFile(
          filter: { base: { eq: "post.mdx" } }
          sort: { fields: childMdx___fields___date, order: DESC }
        ) {
          nodes {
            childMdx {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    const posts = result.data.allFile.nodes
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
    result.data.allFile.nodes.forEach(({ childMdx: post }, index) => {
      createPage({
        path: post.fields.slug,
        component: path.resolve(`./src/templates/blog-post.jsx`),
        context: {
          slug: post.fields.slug,
        },
      })
    })
  })

  return Promise.all([createBlogPages])
}
