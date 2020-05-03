import React from 'react'
import { TableUsers } from '../components/TableUsers'
import { CustomButtonHome } from './styles'
import { Link } from '@reach/router'

export const Home = ({ categoryId }) => {
  return (
    <>
      <Link to='/detail/'>
        <CustomButtonHome primary textContent='Add new user' />
      </Link>
      <TableUsers categoryId={categoryId} />
    </>
  )
}
