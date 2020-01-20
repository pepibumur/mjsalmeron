/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"

const IndexPage = () => (
  <Layout>
    <Styled.h1>Blog</Styled.h1>
  </Layout>
)

export default IndexPage
