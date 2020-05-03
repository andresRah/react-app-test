
import { useState } from 'react'
import { SERVICE_USER_URL } from '../utils/Constants'

export const useUserDataAPI = (userData, restMethod, toggle, onReload = null) => {
  const [errors, setErrors] = useState({})
  const [responseData, setResponse] = useState({})
  const [loadState, setLoading] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    window
      .fetch(`${SERVICE_USER_URL}/${userData?.id ? userData?.id : ''}`, {
        method: restMethod,
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false)
        setResponse({ ...response })
        onReload && onReload()
        toggle()
      })
      .catch((errors) => {
        setLoading(false)
        setErrors({ ...errors })
        toggle()
      })
  }

  return { responseData, errors, loadState, onSubmit }
}
