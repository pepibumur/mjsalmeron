const remarkSlug = require("remark-slug")
const name = "María José Salmerón"
const siteUrl = `https://mjsalmeron.com`

module.exports = {
  siteMetadata: {
    title: name,
    description: `👋 I'm a linguist based in Berlin where I work as a curriculum developer at Chatterbug. Languages are my passion and I'm currently exploring their intersection with technology. This is my personal website where you can find more about myself, and read about my thoughts, learnings, and experiences through blog posts.`,
    siteUrl: siteUrl,
  },
  plugins: [
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
        extensions: [".mdx"],
        gatsbyRemarkPlugins: [
          // {
          //   resolve: `gatsby-remark-social-cards`,
          //   options: {
          //     type: "pages",
          //     title: {
          //       field: "title",
          //       font: "DejaVuSansCondensed",
          //       color: "white",
          //       size: 48,
          //       style: "bold",
          //       x: null,
          //       y: null,
          //     },
          //     meta: {
          //       parts: ["María José Salmerón"],
          //       font: "DejaVuSansCondensed",
          //       color: "white",
          //       size: 24,
          //       style: "normal",
          //       x: null,
          //       y: null,
          //     },
          //     background: "#CC4C33",
          //     xMargin: 24,
          //     yMargin: 24,
          //   },
          // },
          {
            resolve: `gatsby-remark-images`,
          },
        ],
        remarkPlugins: [remarkSlug],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-next-seo",
      options: {
        openGraph: {
          type: "website",
          locale: "en_IE",
          url: siteUrl,
          site_name: name,
        },
        twitter: {
          cardType: "summary_large_image",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: name,
        short_name: `mjsesalm`,
        start_url: `/`,
        theme_color: `hsl(10, 80%, 50%)`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-robots-txt`,
  ],
}
