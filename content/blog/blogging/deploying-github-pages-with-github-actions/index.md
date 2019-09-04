---
title: Github pages를 github actions로 자동 배포하기
date: "2019-09-04T02:47:08.633Z"
description: Github blog를 Github에서 제공하는 github actions로 배포하기
---

블로그를 자동으로 배포하고 싶다. 수동으로 하는 방법은 너무 번거롭기 때문이다.

나의 경우 Github pages를 운영하기 위해서 두 개의 저장소가 필요하다.
(username.github.io 저장소에 두 개의 브랜치를 사용해도 된다.)

- username.github.io 저장소 (static files)

- 블로그 생성기 저장소 (gatsby - static site generater)

따라서 수동으로 블로그를 배포하기 위해서는 블로그의 정적 파일들을 생성하고, 이를 *username.github.io* 리포에 넣어서 푸쉬해야 한다.

그래서 어떻게 배포를 자동화 할 수 있을까 생각하다가 두 개 정도의 선택지를 발견했다.

1. Netlify

2. Github Actions

요즘 블로깅하시는 개발자 분들을 보면 [**netlify**](https://www.netlify.com/)라는 호스팅 서비스를 많이 사용하고 있다. 단순한 호스팅 외에도 많은 기능을 제공하는 아주 편하고 좋은 서비스로 보인다. 따라서 이 서비스를 사용하면 *username.github.io* 같은 저장소를 사용하여 필요가 없다. 블로그의 호스팅을 github pages가 아닌 netlify가 해주기 때문이다. 그래서 블로그 생성기 저장소에 push하고 netlify 서비스만 연동하면 알아서 정적 파일들을 생성하여 호스팅까지 해줄 수 있다.

그러나 나는 써드파티 서비스보다는 깃헙 서비스 내에서 이를 다 해결하고 싶다. 여기저기 분리해서 관리하는 건 아무래도 번거롭지 않나?

### Github Actions

Github Actions는 2018년에 발표됐고, 현재는 beta 버전이다. 사용하기 위해서는 따로 [등록](https://github.com/features/actions)이 필요하며, 2019년 11월 13일부터 공개 버전으로 기본적인 기능으로 사용할 수 있다.

![sign](./signup.png)

`youtube:https://www.youtube.com/embed/E1OunoCyuhY`

Github Actions는 깃헙 저장소의 push, pull request 등 미리 정의된 이벤트에 의해 사용자가 원하는 행동을 취할 수 있다. 이미 존재하는 다른 CI/CD 도구들처럼 빌드, 테스트, 배포 등을 할 수 있다. 이러한 작업들은 워크플로우라고 

또한 누군가 이슈를 올렸을 때 특정한 로직을 실행(이슈에 올라온 코드를 자동으로 실행하여 에러를 발견하는 등)할 수도 있고, pull request에 대해 PR 된 버전과 기존의 master 버전을 각각 배포한 url을 PR 쓰레드의 댓글로 달게 할 수도 있다. 

## 참고 자료

- [Outsider - GitHub Actions 소개](https://blog.outsider.ne.kr/1412)
- [css tricks - Introducing GitHub Actions](https://css-tricks.com/introducing-github-actions/)
- [허원철의 개발 블로그 - GitHub Action을 활용한 GitHub Page 배포](https://heowc.dev/2019/02/03/deploy-gh-page-with-github-action/)