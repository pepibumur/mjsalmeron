/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Styled } from "theme-ui"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faTwitterSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

const HeaderButton = ({ title, path }) => {
  return (
    <Link
      sx={{ fontSize: 3, mr: 4, textDecoration: "none", fontWeight: "bold" }}
      to={path}
    >
      {title}
    </Link>
  )
}

export default () => {
  return (
    <header>
      <Styled.h1 sx={{ mb: 0 }}>
        <span sx={{ color: "secondary" }}>María José</span> Salmerón
      </Styled.h1>
      <div sx={{ mb: 3 }}>
        <FontAwesomeIcon sx={{}} icon={faLinkedin} size="lg" />
        <FontAwesomeIcon sx={{ ml: 2 }} icon={faInstagram} size="lg" />
        <FontAwesomeIcon sx={{ ml: 2 }} icon={faTwitterSquare} size="lg" />
      </div>

      <Styled.p>
        👋 I'm a linguist based in Berlin where I work as a curriculum developer
        at{" "}
        <a href="https://chatterbug.com" target="__blank">
          Chatterbug
        </a>
        . Languages are my passion and I'm currently exploring their
        intersection with technology. This is my personal website where you can
        find more about myself, and read about my thoughts, learnings, and
        experiences through blog posts.
      </Styled.p>
      <div sx={{ display: "flex", flexDirection: "row" }}>
        <HeaderButton title="Blog 📝" path="/" />
        <HeaderButton title="About me 🌍" path="/about" />
        <HeaderButton title="Resources 📚" path="/resources" />
      </div>
    </header>
  )
}
