import React from "react"
import styled from "styled-components"

import Header from './Header'
import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: block;
  }
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${rhythm(28)};
  @media screen and (max-width: 768px) {
    padding-top: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    max-width: calc(100% - 228px);
  }
  padding: 0 ${rhythm(3 / 4)} ${rhythm(1.5)};
`

const Layout = ({ title, children, location }) => {
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <Container>
      <Header title={title} location={location} />
      <Content>
        <main>{children}</main>
        <footer>
          {/* <a href={`https://github.com/ohseunghyeon`} target="_blank" rel="noopener noreferrer">
          github
        </a> */}
        </footer>
      </Content>
    </Container>
  )
}

export default Layout
