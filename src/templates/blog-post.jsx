/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Meta from "../components/meta"
import moment from "moment"

const Footer = ({ pageContext }) => {
  const prev = pageContext.prev
  const next = pageContext.next

  return (
    <div
      sx={{
        display: "flex",
        flex: 1,
        my: 5,
        alignItems: ["center", "center", "center"],
        flexDirection: ["column", "column", "row"],
        justifyContent: "space-between",
      }}
    >
      {prev && (
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <b>Previous: </b>
          <Link to={prev.fields.slug}>{prev.frontmatter.title}</Link>
        </div>
      )}
      {next && (
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <b>Next: </b>
          <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
        </div>
      )}
    </div>
  )
}

const BlogPostPage = ({ data: { mdx: post }, pageContext }) => {
  const publishedDateString = moment(post.fields.date).format("MMMM Do YYYY")

  return (
    <Layout>
      <Meta title="Post" />
      <article>
        <header>
          <Styled.h1>{post.frontmatter.title}</Styled.h1>

          <Styled.div sx={{ fontSize: 2, color: "gray" }}>
            Published on {publishedDateString} {` · `}
            {post.frontmatter.tags.map(tag => (
              <span
                sx={{
                  mr: 2,
                }}
              >
                {`#${tag}`}
              </span>
            ))}
          </Styled.div>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <Footer pageContext={pageContext} />
      </article>
    </Layout>
  )
}

export default BlogPostPage

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        date
      }
      body
      excerpt
      frontmatter {
        title
        tags
      }
    }
  }
`
