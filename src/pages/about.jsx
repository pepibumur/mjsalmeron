/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Meta from "../components/meta"
import profilePicture from "../images/profile-pic.jpg"
import Helmet from "react-helmet"

const AboutPage = () => {
  const {
    file,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "about.mdx" }) {
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
      <Meta title="About me" />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${siteMetadata.siteUrl}/about/twitter-card.jpg`}
        />
      </Helmet>
      <img
        src={profilePicture}
        sx={{ height: 200, width: 200, borderRadius: 100 }}
      />
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default AboutPage
