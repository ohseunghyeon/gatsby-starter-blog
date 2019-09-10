---
title: About 페이지 만들기
date: "2019-09-10T08:15:51.446Z"
---

Gatsby core는 자동으로 src/pages 폴더 내의 파일을 참조하여 해당 파일 이름의 path로 페이지를 생성한다.  
즉 `src/pages/about.js` 파일을 생성하면 `/about`이라는 경로로 페이지가 생성된다.

따라서 About 페이지를 만들기 위해서 할 일은 `src/pages/about.js` 파일을 생성하고 다음과 같이 소스를 작성하는 것이다. 그럼 자동으로 `/about` 경로로 페이지가 생성된다.

```javascript
import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location, data }) => (
  <Layout location={location} title={data.site.siteMetadata.title}>
    <SEO title="About" />
    <h1>About Me</h1>
    <p>안녕하세요 제 블로그에 오신 것을 환영합니다.</p>
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

`src/pages/404.js`와 `src/pages/index.js` 페이지를 참고하여 작성했다.

페이지의 Wrapper인 Layout 컴포넌트를 최상위에 두고 아래에 SEO 컴포넌트와 제목, 내용 등을 배치했다. 또한 `404.js`에 있던 pageQuery를 그대로 들고와서 Layout 컴포넌트가 필요로 하는 데이터를 가져올 수 있게 만들었다.

(이 GraphQL Query는 pageQuery라는 변수로 export 되어야 하며, 작성된 컴포넌트의 props로 받게 되는 것 같다)

이제 이 페이지를 만들었으니 나에 대한 소개를 적고, 어바웃 페이지로 향하는 링크를 어디에 둘지 고민해야겠다.  
