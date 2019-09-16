import './global.css';

import Typography from "typography"
import GitHub from "typography-theme-github"

GitHub.overrideThemeStyles = () => {
  return {
    'a:hover': {
      textDecoration: `none`,
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
      textDecoration: `none`,
    },
    'body': {
      wordBreak: `keep-all`
    }
  }
}

GitHub.bodyFontFamily = ['NanumGothic'];
GitHub.aFontFamily = ['NanumGothic'];

const typography = new Typography(GitHub)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
