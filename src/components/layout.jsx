import React from "react"
import styled from "styled-components"

import Header from './header'
import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 48em) {
    display: block;
  }
`

const Layout = (props) => {
  const { title, children } = props
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <Container>
      <Header title={title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: rhythm(24),
          padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)}`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: '4.375rem',
            paddingTop: '1.75rem'
          }}
        >
          {/* <a href={`https://github.com/ohseunghyeon`} target="_blank" rel="noopener noreferrer">
          github
        </a> */}
        </footer>
      </div>
    </Container>
  )
}

export default Layout
