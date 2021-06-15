import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

import { formatReadingTime } from "../utils/helpers"

const CategoryLink = styled(Link)`
  opacity: 0.75;
  ::before {
    content: " • ";
  }
  br {
    display: none;
  }
  @media screen and (max-width: 768px) {
    ::before {
      display: none;
    }
    br {
      display: inline;
    }
  }
`

const PostFrontmatter = ({ date, timeToRead, category, isInPost, creator, created_at, link }) => {
  const Container = ({ children }) => isInPost
    ?
    (
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
        }}
      > {children}</p>
    )
    :
    (
      <small>{children}</small>
    )

  return (
    <Container>
      {date}
      {
        category &&
        <CategoryLink to={`/${category}`}>
          <br />
          {category}
        </CategoryLink>
      }
      <br />
      {link && <div>link: <a href={link} target="_blank">{link}</a></div>}
      {creator && <div>creator: {creator}</div>}
      {created_at && <div>created_at: {created_at}</div>}
    </Container>
  )
}

export default PostFrontmatter