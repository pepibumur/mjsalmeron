/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Global } from "@emotion/core"
import { Styled } from "theme-ui"
import Header from "./header"
import Footer from "./footer"
import Meta from "../components/meta"

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={theme => {
          const headingStyle = {
            textDecoration: "none",
            color: theme.colors.text,
            "&:visited": {
              color: theme.colors.text,
            },
          }
          return {
            "h1 a": headingStyle,
            "h2 a": headingStyle,
            "h3 a": headingStyle,
            "h4 a": headingStyle,
            "h5 a": headingStyle,
            a: {
              color: theme.colors.primary,
            },
          }
        }}
      />
      <Styled.root>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <Header />
          <main sx={{ py: 4 }}>{children}</main>
          <Footer />
        </div>
      </Styled.root>
    </>
  )
}
export default Layout
