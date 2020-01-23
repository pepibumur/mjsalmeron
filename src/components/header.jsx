/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Styled } from "theme-ui"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Location } from "@reach/router"
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"
import Mailto from "react-protected-mailto"

const HeaderButton = ({ title, path, highlighted }) => {
  return (
    <Link
      sx={{
        fontSize: 3,
        mr: 4,
        textDecoration: "none",
        fontWeight: "bold",
        color: highlighted ? "primary" : "text",
        "&:hover": {
          color: "primary",
        },
      }}
      to={path}
    >
      {title}
    </Link>
  )
}

export default () => {
  const iconSize = 20
  return (
    <header>
      <Styled.h1 sx={{ mb: 0 }}>
        <span sx={{ color: "secondary" }}>María José</span> Salmerón
      </Styled.h1>
      <div sx={{ mb: 3 }}>
        <a
          href="https://www.linkedin.com/in/mar%C3%ADa-josé-salmerón-ibáñez-1262ba9b/"
          target="__blank"
        >
          <FontAwesomeIcon
            sx={{ width: iconSize, height: iconSize, fontSize: iconSize }}
            icon={faLinkedin}
            size="lg"
          />
        </a>
        <a href="https://www.instagram.com/mjsesaalm/" target="__blank">
          <FontAwesomeIcon
            sx={{
              ml: 2,
              width: iconSize,
              height: iconSize,
              fontSize: iconSize,
            }}
            icon={faInstagram}
            size="lg"
          />
        </a>
        <Mailto
          sx={{ ml: 3 }}
          email="mjsesalm@gmail.com"
          headers={{ subject: "Hi María José 👋" }}
        />
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
      <Location>
        {({ location }) => {
          const isAbout = location.pathname.startsWith("/about")
          const isInspiration = location.pathname.startsWith("/inspiration")
          const isBlog = !isAbout && !isInspiration
          return (
            <div sx={{ display: "flex", flexDirection: "row" }}>
              <HeaderButton title="Blog 📝" path="/" highlighted={isBlog} />
              <HeaderButton
                title="About me 🌍"
                path="/about"
                highlighted={isAbout}
              />
              <HeaderButton
                title="Inspiration 💡"
                path="/inspiration"
                highlighted={isInspiration}
              />
            </div>
          )
        }}
      </Location>
    </header>
  )
}
