import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"

const IndexPage = () => (
  <Layout>
    <Styled.h1>María José Salmerón</Styled.h1>
    <Styled.p>
      👋 I'm a linguist based in Berlin where I work as a curriculum developer
      at Chatterbug. Languages are my passion and I'm currently exploring their
      intersection with technology. This is my personal website where you can
      find more about myself, read about my thoughts, learnings, and experiences
      through blog posts.
    </Styled.p>
  </Layout>
)

export default IndexPage
