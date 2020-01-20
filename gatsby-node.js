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
