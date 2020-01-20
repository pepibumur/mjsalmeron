/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Styled } from "theme-ui"
import { Link } from "gatsby"

export default () => {
  return (
    <footer sx={{ textAlign: "center", color: "gray" }}>
      This{" "}
      <Styled.a
        target="__blank"
        href="https://github.com/pepibumur/mjsalmeron/"
      >
        website
      </Styled.a>{" "}
      has been built by{" "}
      <Styled.a href="https://ppinera.es" target="__blank">
        Pedro Piñera
      </Styled.a>{" "}
      using{" "}
      <Styled.a href="https://www.gatsbyjs.org" target="__blank">
        GatsbyJS
      </Styled.a>
    </footer>
  )
}
