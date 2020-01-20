/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import Meta from "../components/meta"
import moment from "moment"

function usePosts() {
  const {
    allFile: { nodes: posts },
  } = useStaticQuery(graphql`
    {
      allFile(
        filter: { base: { eq: "post.mdx" } }
        sort: { fields: childMdx___fields___date, order: DESC }
      ) {
        nodes {
          childMdx {
            frontmatter {
              title
              tags
            }
            fields {
              date
              slug
            }
            excerpt(pruneLength: 300)
            body
          }
        }
      }
    }
  `)
  return posts.map(post => post.childMdx)
}

const Post = ({ post }) => {
  const publishedDateString = moment(post.fields.date).format("MMMM Do YYYY")
  return (
    <article sx={{ mb: 3 }}>
      <header>
        <Styled.h2 sx={{ mb: 2 }}>{post.frontmatter.title}</Styled.h2>
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
      <main>
        <Styled.p>{post.excerpt}</Styled.p>
      </main>
      <footer>
        <Link to={post.fields.slug}>Read on...</Link>
      </footer>
    </article>
  )
}

const IndexPage = () => {
  const posts = usePosts()
  return (
    <Layout>
      <Meta title="Blog" />
      <Styled.h1>Blog</Styled.h1>
      {posts.map((post, index) => {
        return <Post post={post} key={index} />
      })}
    </Layout>
  )
}

export default IndexPage
