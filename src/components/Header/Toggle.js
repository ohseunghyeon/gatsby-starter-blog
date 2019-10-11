import React, { useState, useEffect } from 'react';

import ReactToggle from 'react-toggle';

import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';

import './Toggle.scss';

const Toggle = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, []);

  return (
    <ReactToggle
      icons={{
        checked: (
          <img
            src={moon}
            width="16"
            height="16"
            alt="presentation"
            style={{ pointerEvents: 'none' }}
          />
        ),
        unchecked: (
          <img
            src={sun}
            width="16"
            height="16"
            alt="presentation"
            style={{ pointerEvents: 'none' }}
          />
        ),
      }}
      checked={theme === 'dark'}
      onChange={e =>
        window.__setPreferredTheme(
          e.target.checked ? 'dark' : 'light'
        )
      }
    />
  )
}

export default Toggle;