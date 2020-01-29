/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const ResourcesPage = () => {
  const {
    file,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "inspiration.mdx" }) {
        childMdx {
          body
          excerpt
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
      <GatsbySeo
        title="Inspiration"
        titleTemplate="%s | María José Salmerón"
        description={file.childMdx.excerpt}
        image={`${siteMetadata.siteUrl}/inspiration/twitter-card.jpg`}
      />
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default ResourcesPage
