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

const AboutPage = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "about.mdx" }) {
        childMdx {
          body
        }
      }
    }
  `)
  return (
    <Layout>
      <Meta title="About me" />
      <img
        src={profilePicture}
        sx={{ height: 200, width: 200, borderRadius: 100 }}
      />
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default AboutPage
