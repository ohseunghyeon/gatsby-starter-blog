import React, { useCallback, useRef } from "react"

import "./HeaderHamburger.scss"

const NavToggle = () => {
  const refButton = useRef(null)
  const handleToggle = useCallback(() => {
    refButton.current.classList.toggle('active');
  }, [refButton])

  return (
    <button
      className="nav-toggle"
      ref={refButton}
      onClick={handleToggle}
    />
  )
}

export default NavToggle;