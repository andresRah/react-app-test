import React, { useState } from 'react'
import { Table, Tr } from 'styled-table-component'
import { CustomButton } from '../CustomButton'
import { FormGroup } from 'styled-form-component'
import { MdZoomIn } from 'react-icons/md'
import { useUsersDataValue } from '../../hooks/useUsersDataValue'
import { useModalValue } from '../../hooks/useModalValue'
import { useUserDataAPI } from '../../hooks/useUserDataAPI'
import { CustomModal } from '../CustomModal'
import { Button } from './styles'
import { Span } from 'styled-base-components'
import { Graph } from '../Graph'
import { Ripple } from 'react-awesome-spinners'
import { Link } from '@reach/router'

const TYPE_PERSON_MODAL = 1

export const TableUsers = () => {
  const [modalOperation, setModalOperation] = useState('DELETE')
  const { usersData, loading, onReload } = useUsersDataValue()
  const { isShowing, toggle, showModal, useInfo } = useModalValue()
  const { loadState, onSubmit } = useUserDataAPI(useInfo, 'DELETE', toggle, onReload)

  const renderTableUsers =
      loading
        ? <Ripple />
        : usersData.length > 0 ? usersData.map((userData) =>
          <Tr light key={userData.id}>
            <td>{userData.id}</td>
            <td>{userData.name}</td>
            <td>{userData.age}</td>
            <td>
              <Link key={userData.id} to={`/detail/${userData.id}`}>
                <CustomButton primary textContent='Edit' />
              </Link>
              <CustomButton
                danger textContent='Delete' onClick={() => {
                  setModalOperation('DELETE')
                  showModal(userData)
                }}
              />
            </td>
            <td>
              {
                (userData.personTypeId !== TYPE_PERSON_MODAL) &&
                  <Button onClick={() => {
                    setModalOperation('UPDATE')
                    showModal(userData)
                  }}
                  >
                    <MdZoomIn size='32px' />
                  </Button>
              }
            </td>
          </Tr>)
          : <Tr light>
            <td COLSPAN='5'><Span textWeightBold>Not Data Found</Span></td>
          </Tr>

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Age</th>
            <th scope='col'>Actions</th>
            <th scope='col'>Modals</th>
          </tr>
        </thead>
        <tbody>
          {renderTableUsers}
        </tbody>
      </Table>
      <CustomModal isShowing={isShowing} hide={toggle} title='User Information'>
        <form>
          <FormGroup>
            <Span m1><Span textWeightBold>Name:</Span> {useInfo?.name}</Span>
          </FormGroup>
          <FormGroup>
            <Span m1><Span textWeightBold>Age:</Span> {useInfo?.age}</Span>
          </FormGroup>
        </form>
        {
          loadState && <Ripple />
        }
        {
          (modalOperation === 'DELETE') ?
            <>
              <h3>Are you sure to delete the current user?</h3>
              <CustomButton info textContent='Si' onClick={onSubmit} />
              <CustomButton danger textContent='No' onClick={toggle} />
            </>
            :
            <>
              <Graph toggle={toggle} />
            </>
        }
      </CustomModal>
    </>
  )
}
