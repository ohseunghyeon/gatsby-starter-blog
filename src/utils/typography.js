// import "../styles/global.scss";

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
    'h1, h2, h3': {
      marginTop: `2.625rem`
    }
  }
}

GitHub.bodyFontFamily = ['Apple SD Gothic Neo', 'NanumGothic', 'sans-serif'];

const typography = new Typography(GitHub)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
