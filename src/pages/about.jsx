/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import profilePicture from "../images/profile-pic.jpg"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const AboutPage = () => {
  const {
    file,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "about.mdx" }) {
        childMdx {
          body
          excerpt
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)
  return (
    <Layout>
      <GatsbySeo
        title="About me"
        titleTemplate={`%s | ${siteMetadata.title}`}
        description={file.childMdx.excerpt}
        image={`${siteMetadata.siteUrl}/about/twitter-card.jpg`}
        openGraph={{
          title: siteMetadata.title,
          description: file.childMdx.excerpt,
          url: siteMetadata.siteUrl,
          type: "profile",
          profile: {
            firstName: "María José",
            lastName: "Salmerón Ibáñez",
            gender: "female",
          },
          images: [
            {
              url: profilePicture,
              width: 850,
              height: 650,
              alt: "Profile Photo",
            },
          ],
        }}
      />
      <img
        src={profilePicture}
        sx={{ height: 200, width: 200, borderRadius: 100 }}
      />
      <MDXRenderer>{file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default AboutPage
