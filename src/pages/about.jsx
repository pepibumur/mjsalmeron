/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Meta from "../components/meta"

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
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default AboutPage
