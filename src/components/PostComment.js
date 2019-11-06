import React, { useEffect } from 'react'

const src = 'https://utteranc.es/client.js'
const repo = `ohseunghyeon/ohseunghyeon.github.io`

export const Utterances = () => {
  const rootElm = React.createRef()
  console.log('그리기')
  useEffect(() => {
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  }, [])
  // }, [rootElm])

  return <div ref={rootElm} />
}
