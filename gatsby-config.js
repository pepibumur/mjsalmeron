const remarkSlug = require("remark-slug")

module.exports = {
  siteMetadata: {
    title: `María José Salmerón`,
    description: `👋 I'm a linguist based in Berlin where I work as a curriculum developer at Chatterbug. Languages are my passion and I'm currently exploring their intersection with technology. This is my personal website where you can find more about myself, and read about my thoughts, learnings, and experiences through blog posts.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `María José Salmerón`,
        short_name: `mjsesalm`,
        start_url: `/`,
        theme_color: `hsl(10, 80%, 50%)`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
          },
        ],
        remarkPlugins: [remarkSlug],
      },
    },
  ],
}
