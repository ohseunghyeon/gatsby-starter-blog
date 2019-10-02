import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { rhythm, scale } from "../../utils/typography"

import { formatReadingTime } from "../../utils/helpers"

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

const PostFrontmatter = ({ date, timeToRead, category, isInPost }) => {
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
      {` • ${formatReadingTime(timeToRead)}`}
      {
        category &&
        <CategoryLink to={`/${category}`}>
          <br />
          {category}
        </CategoryLink>
      }
    </Container>
  )
}

export default PostFrontmatter