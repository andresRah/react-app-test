import { useState } from 'react'

export const useModalValue = () => {
  const [isShowing, setIsShowing] = useState(true)
  const [useInfo, setUserInfo] = useState({})

  function toggle () {
    setIsShowing(!isShowing)
  }

  function showModal (userData) {
    setUserInfo(userData)
    toggle()
  }

  return {
    isShowing,
    toggle,
    showModal,
    useInfo
  }
}
