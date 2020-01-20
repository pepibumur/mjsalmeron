/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import Meta from "../components/meta"

const ResourcesPage = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "inspiration.mdx" }) {
        childMdx {
          body
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
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default ResourcesPage
