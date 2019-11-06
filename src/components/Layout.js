import React from "react"
import styled from "styled-components"
import Header from "./Header"

import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  color: var(--textNormal);
  background: var(--bg);
  transition: color 0.2s ease-out, background 0.2s ease-out;

  @media screen and (max-width: 768px) {
    display: block;
  }
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 49rem;
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
        <main style={{ position: `relative` }}>{children}</main>
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
