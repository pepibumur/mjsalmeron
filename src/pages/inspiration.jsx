/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import Meta from "../components/meta"
import Helmet from "react-helmet"

const ResourcesPage = () => {
  const {
    file,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "inspiration.mdx" }) {
        childMdx {
          body
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)
  return (
    <Layout>
      <Meta
        description={
          "This page is my little corner where I collect resources that inspire my work."
        }
        title="Inspiration"
      />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${siteMetadata.siteUrl}/inspiration/twitter-card.jpg`}
        />
      </Helmet>
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default ResourcesPage
