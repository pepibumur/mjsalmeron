/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Styled } from "theme-ui"
import moment from "moment"
import { GatsbySeo, BlogJsonLd } from "gatsby-plugin-next-seo"
import profilePicture from "../images/profile-pic.jpg"

const Post = ({ post }) => {
  const publishedDateString = moment(post.fields.date).format("MMMM Do YYYY")
  return (
    <article sx={{ mb: 3 }}>
      <header>
        <Styled.h2 sx={{ mb: 2 }}>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </Styled.h2>

        <Styled.div sx={{ fontSize: 2, color: "gray" }}>
          Published on {publishedDateString} {` · `}
          {post.frontmatter.tags.map((tag, index) => (
            <span
              key={index}
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

const Footer = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/" : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`

  return (
    <div
      sx={{
        mt: 5,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {!isFirst && (
        <div>
          <Link to={prevPage}>Previous page</Link>
        </div>
      )}
      {!isLast && (
        <div>
          <Link to={nextPage}>Next page</Link>
        </div>
      )}
    </div>
  )
}

const BlogListPage = ({
  pageContext,
  data: {
    allMdx,
    allFile: { nodes: posts },
    site: { siteMetadata },
  },
}) => {
  return (
    <Layout>
      <GatsbySeo title="Blog" titleTemplate="%s | María José Salmerón" />
      <BlogJsonLd
        url={siteMetadata.siteUrl}
        headline={`${siteMetadata.title}'s Blog`}
        images={profilePicture}
        posts={allMdx.nodes.map(node => {
          return {
            headline: node.frontmatter.title,
            image: `${siteMetadata.siteUrl}${node.fields.slug}twitter-card.jpg`,
          }
        })}
        authorName={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Styled.h1>Blog</Styled.h1>
      {posts.map((post, index) => {
        return <Post post={post.childMdx} key={`${index}`} />
      })}
      <Footer {...pageContext} />
    </Layout>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMdx(filter: { fileAbsolutePath: { regex: "/posts/.*/post.mdx/" } }) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    allFile(
      filter: { base: { eq: "post.mdx" } }
      sort: { fields: childMdx___fields___date, order: DESC }
      limit: $limit
      skip: $skip
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
`

export default BlogListPage
