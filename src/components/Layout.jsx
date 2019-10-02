import React from "react"
import styled from "styled-components"

import Header from './Header1'
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
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    max-width: calc(100% - 228px);
  }
  padding: 0 ${rhythm(3 / 4)} ${rhythm(1.5)};
`

const Layout = (props) => {
  const { title, children } = props
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <Container>
      <Header title={title} />
      <Content>
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
      </Content>
    </Container>
  )
}

export default Layout
