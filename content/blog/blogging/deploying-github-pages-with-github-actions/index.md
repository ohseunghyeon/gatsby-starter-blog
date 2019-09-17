---
title: Github pages를 github actions로 자동 배포하기
date: "2019-09-04T02:47:08.633Z"
description: Github blog를 Github에서 제공하는 github actions로 배포하기
---

나는 Github pages를 운영하기 위해서 두 개의 저장소를 사용하고 있다.

```
- username.github.io 저장소 (static files)
- 블로그 생성기 저장소 (gatsby - static site generater)
```

따라서 수동으로 블로그를 배포하기 위해서는 블로그의 정적 파일들을 생성하고, 이를 **username.github.io** 저장소에 푸쉬해야 한다.  
이 과정을 어떻게 자동화 할 수 있을까 생각하다가 두 개 정도의 선택지로 추렸다.

```
1. Netlify (또는 배포 자동화를 제공하는 서비스)
2. Github Actions
```

요즘 블로깅하시는 개발자 분들을 보면 [**netlify**](https://www.netlify.com/)라는 서비스를 많이 사용하고 있다. 단순한 호스팅 외에도 많은 기능을 제공하는 서비스로 보인다.

이 서비스를 사용하면 **username.github.io** 같은 저장소를 사용하여 필요가 없다. 블로그의 호스팅을 github pages가 아닌 netlify가 해주기 때문이다. 그래서 블로그 생성기 저장소에 push하고 netlify 서비스만 연동하면 알아서 정적 파일들을 생성하여 호스팅까지 해줄 수 있다.

그러나 나는 써드파티 서비스보다는 깃헙 서비스 내에서 이를 다 해결하고 싶다. 여기저기 분리해서 관리하는 건 아무래도 번거롭지 않나?

### Github Actions

![sign](./signup.png)

Github Actions는 2018년에 발표됐고, 현재는 beta 버전이다. 사용하기 위해서는 따로 [등록](https://github.com/features/actions)이 필요하며, 2019년 11월 13일부터 공개 버전으로 기본적인 기능으로 사용할 수 있다.

`youtube:https://www.youtube.com/embed/E1OunoCyuhY`

Github Actions는 깃헙 저장소의 push, pull request 등 미리 정의된 이벤트에 의해 사용자가 원하는 행동을 취할 수 있다. 이미 존재하는 다른 CI/CD 도구들처럼 빌드, 테스트, 배포 등을 할 수 있다. 이러한 작업들은 워크플로우라고 

또한 누군가 이슈를 올렸을 때 특정한 로직을 실행(이슈에 올라온 코드를 자동으로 실행하여 에러를 발견하는 등)할 수도 있고, pull request에 대해 PR 된 버전과 기존의 master 버전을 각각 배포한 url을 PR 쓰레드의 댓글로 달게 할 수도 있다.

## 어떻게 배포할까

내 경우는 **정적 사이트 생성기**와 **github pages** 저장소가 따로 존재한다.

Gatsby 공식 사이트의 문서에 [Github Pages 관련 배포에 대한 문서](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)가 있으나 이는 한 저장소 내에 정적 사이트 생성기와 정적 파일이 *브랜치*로 구분되어 있는 경우를 설명하는 것이기에 나의 경우와는 관련이 없다.

내 경우는 배포를 위해서

1. 정적 생성기를 push한다.
2. push된 정적 생성기 저장소에서 gatsby build 명령어로 정적 파일들을 생성한다. (*/public* 경로에 파일 생성됨)
3. 생성된 파일을 **username.github.io** 저장소에 붙여 넣는다.
4. **username.github.io** 저장소를 커밋해 푸쉬한다.

분명 간단한 과정이긴 한데, 이 과정을 github actions에서 구현하려면 어떻게 하지?

## Github actions 톺아보기

workflow 파일은 yml syntax를 사용하며 확장자는 `.yml` or `.yaml`이다. yml에 대해 빠르게 알고 싶다면 [Learn YAML in five minutes!](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)를 읽어보라.  
참고로 Github Actions가 나온 당시에는 HCL syntax라는 것을 사용했지만 2019년 9월 30일 이후로 deprecated 된다.

### 용어 정리

#### Workflow

설정 가능한 자동화 된 프로세스. 깃허브에 있는 프로젝트를 빌드, 테스트, 패키지, 릴리즈, 배포를 하기 위해서 저장소 내에 셋업할 수 있다. Workflow는 하나 이상의 job들로 이루어져 있으며, 스케쥴 또는 이벤트에 의해 활성화될 수 있다.

#### Workflow run

workflow의 인스턴스. 미리 설정된 이벤트가 발생했을 때 돌아간다. 매 workflow run에 대해 jobs, actions, logs, statuses를 확인할 수 있다.

#### Workflow file

YAML 파일. 하나 이상의 job을 포함한 workflow 설정 사항을 정의한다. 이 파일은 당신의 깃허브 저장소 최상단에서 `.github/workflows` 디렉토리 내에 존재한다.

#### Job

단계들로 정의된 하나의 작업. 매 작업은 새로 생성되는 가상 환경 인스턴스 내에서 동작한다. workflow file 내에서 job 들이 어떻게 돌아가야 하는지 설정하기 위해 의존성 규칙을 정의할 수 있다. job들을 나란히 돌릴 수도 있고, 이전 job의 상태를 봐가며 순차적으로 돌릴 수도 있다. 예를 들어 하나의 workflow에 **build**와 **test code**라는 두 개의 job이 있고, test job이 build job에 의존한다고 정의할 때, build job이 실패하면 test job은 돌아가지 않는다.

#### Step

step은 job에 의해 실행되는 task들의 집합이다. 각 스탭은 job이 실행되는 하나의 가상환경 안에서 action들이 filesystem을 사용하여 서로 정보를 교환할 수 있게 한다. step들은 command나 action을 실행할 수 있다.

#### Action

각각의 task들. 이를 결합하여 steps를 만들고 이는 곧 하나의 job이 된다(Individual tasks that you combine as steps to create a job). Action은 workflow에서 가장 작은 조립 블록이다. 당신의 actions를 만들 수 있고, 이 action을 깃허브 커뮤니티에 공유하거나, 다른 public action를 커스터마이즈 할 수도 있다. action을 workflow 내에서 사용하기 위해서는 반드시 action을 하나의 step으로써 포함해야 한다. (action === step 인가?)

#### Continuous integration (CI)

공유되는 저장소에 작은 코드를 빈번히 커밋할 때 사용되는 software 개발 방법. Github Actions를 가지고 빌드와 테스트를 자동화하기 위하여 당신만의 CI workflow를 생성할 수 있다. 저장소에서 workflow의 매 action 의 코드의 변화와 상세한 로그를 확인할 수 있다. CI는 버그를 더 빠르게 찾거나 해결하기 위해, 코드 상의 변화에 대한 즉각적인 반응을 제공하여 개발자의 시간을 절약해준다.

#### Continuous deployment (CD)

CI 상에서 빌드하는 것. 새로운 코드가 커밋되어 CI 테스트를 통과할 때, 그 코드는 자동으로 production에 배포된다. Github Actions를 가지고 당신만의 CD workflow를 만들 수 있으며, 이를 통해 자동으로 당신의 코드를 클라우드나, self-hosted service나 플랫폼에 배포할 수 있다. CD는 개발 과정을 자동화하고 테스트되고 안정된 코드 변화를 더 빠르게 고객에게 배포하여 개발자의 시간을 절약해준다.

#### Virtual environment

Github은 Linux, maxOS, Windows 가상 환경을 제공하여, 당신의 workflow를 돌리게 한다.

#### Runner

각 가상 환경 내의 Github 서비스는 가능한 job을 기다린다. runner가 job을 고르면, job의 actions를 실행하고, 경과, 로그, 결과를 깃헙에게 보고한다. runners는 한 번에 하나의 job을 실행한다.

#### Event

workflow run을 유발하는 특정 동작. 예를 들어 누군가 저장소에 커밋을 푸쉬하거나 이슈 또는 풀리퀘스트가 생성되는 행위.  또한 repository dispatch webhook을 사용한 외부 이벤트 발생을 이벤트로 설정할 수 있다.

#### Artifact

빌드나 코드를 테스트할 때 생성되는 파일. 예를 들어, 바이너리나 패키지 파일, 테스트 결과, 스크린샷, 로그 파일 등이 이에 해당한다. workflow에서 생성된 artifact는 해당 workflow와 관련이 있고, 다른 job에 의해 사용되거나 배포될 수 있다.

### Workflow 파일 생성

workflow file은 저장소의 root에서 `.github/workflows` 디렉토리를 생성한 후 그 내부에 `.yml`로 생성한다. 내 경우 blog deploy를 위해 `.github/workflows/continuous-deployment-workflow.yml`로 만들겠다.

workflow 작성법을 알고 싶다면 [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow)와 [Workflow syntax for Github Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions)를 참고하길 바란다.

List of [Event Trigger](https://help.github.com/en/articles/events-that-trigger-workflows)


- 매 액션은 경로를 그 repo로 갖고 시작한다.

https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line

## 참고 자료

- [Outsider - GitHub Actions 소개](https://blog.outsider.ne.kr/1412)
- [css tricks - Introducing GitHub Actions](https://css-tricks.com/introducing-github-actions/)
- [허원철의 개발 블로그 - GitHub Action을 활용한 GitHub Page 배포](https://heowc.dev/2019/02/03/deploy-gh-page-with-github-action/)
