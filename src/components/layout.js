import React from "react"
import { Global } from "@emotion/core"
import { Styled } from "theme-ui"

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
          <main>{children}</main>
          <footer></footer>
        </div>
      </Styled.root>
    </>
  )
}
export default Layout
