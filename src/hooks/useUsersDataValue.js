
import { useState, useEffect } from 'react'
import { SERVICE_USER_URL } from '../utils/Constants'

export const useUsersDataValue = () => {
  const [usersData, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const onReload = (event) => {
    GetUsers()
  }

  useEffect(function () {
    GetUsers()
  }, [])

  function GetUsers () {
    setLoading(true)
    window.fetch(SERVICE_USER_URL)
      .then(res => res.json())
      .then(response => {
        setUsers(response)
        setLoading(false)
      })
  }

  return { usersData, loading, onReload }
}
