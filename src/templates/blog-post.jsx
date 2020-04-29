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
    ghostPost: post,
    site: { siteMetadata },
  },
  pageContext,
}) => {
  const publishedDateString = moment(post.published_at).format("MMMM Do YYYY")

  return (
    <Layout>
      <GatsbySeo
        title={post.title}
        titleTemplate="%s | María José Salmerón"
        keywords={post.tags.map(tag => tag.name)}
        description={post.excerpt}
        image={`${siteMetadata.siteUrl}${post.slug}twitter-card.jpg`}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `${siteMetadata}${post.slug}`,
          type: "article",
          article: {
            publishedTime: moment(post.published_at).format(),
            authors: [`${siteMetadata}/about`],
            tags: post.tags.map(tag => tag.name),
          },
          images: [
            {
              url: `${siteMetadata.siteUrl}${post.slug}twitter-card.jpg`,
              width: 850,
              height: 650,
            },
          ],
        }}
      />
      <BlogPostJsonLd
        url={`${siteMetadata.siteUrl}${post.slug}`}
        title={post.title}
        images={[`${siteMetadata.siteUrl}${post.slug}twitter-card.jpg`]}
        datePublished={moment(post.published_at).format()}
        authorName={siteMetadata.title}
        description={siteMetadata.description}
      />
      <article>
        <header>
          <Styled.h1>{post.title}</Styled.h1>

          <Styled.div sx={{ fontSize: 2, color: "gray" }}>
            Published on {publishedDateString} {` · `}
            {post.tags.map((tag, index) => (
              <span
                key={index}
                sx={{
                  mr: 2,
                }}
              >
                {`#${tag.name}`}
              </span>
            ))}
          </Styled.div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
    ghostPost(slug: { eq: $slug }) {
      slug
      published_at
      html
      title
      excerpt
      tags {
        name
      }
    }
  }
`
