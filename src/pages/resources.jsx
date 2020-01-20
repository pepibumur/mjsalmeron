/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"

const ResourcesPage = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "resources.mdx" }) {
        childMdx {
          body
        }
      }
    }
  `)
  return (
    <Layout>
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default ResourcesPage
