/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from "moment"
import { GatsbySeo, BlogPostJsonLd } from "gatsby-plugin-next-seo"

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

const BlogPostPage = ({
  data: {
    mdx: post,
    site: { siteMetadata },
  },
  pageContext,
}) => {
  const publishedDateString = moment(post.fields.date).format("MMMM Do YYYY")

  return (
    <Layout>
      <GatsbySeo
        title={post.frontmatter.title}
        titleTemplate="%s | María José Salmerón"
        keywords={post.frontmatter.tags}
        description={post.excerpt}
        image={`${siteMetadata.siteUrl}${post.fields.slug}twitter-card.jpg`}
        openGraph={{
          title: post.frontmatter.title,
          description: post.excerpt,
          url: `${siteMetadata}${post.fields.slug}`,
          type: "article",
          article: {
            publishedTime: moment(post.fields.date).format(),
            authors: [`${siteMetadata}${post.fields.slug}/about`],
            tags: post.frontmatter.tags,
          },
          images: [
            {
              url: `${siteMetadata.siteUrl}${post.fields.slug}twitter-card.jpg`,
              width: 850,
              height: 650,
            },
          ],
        }}
      />
      <BlogPostJsonLd
        url={`${siteMetadata.siteUrl}${post.fields.slug}`}
        title={post.frontmatter.title}
        images={[`${siteMetadata.siteUrl}${post.fields.slug}twitter-card.jpg`]}
        datePublished={moment(post.fields.date).format()}
        authorName={siteMetadata.title}
        description={siteMetadata.description}
      />
      <article>
        <header>
          <Styled.h1>{post.frontmatter.title}</Styled.h1>

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
        <MDXRenderer>{post.body}</MDXRenderer>
        <Footer pageContext={pageContext} />
      </article>
    </Layout>
  )
}

export default BlogPostPage

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }
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
