/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import Meta from "../components/meta"

const IndexPage = () => (
  <Layout>
    <Meta title="Blog" />
    <Styled.h1>Blog</Styled.h1>
  </Layout>
)

export default IndexPage
