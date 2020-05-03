import React, { useState, useEffect } from 'react'
import { Column } from 'styled-grid-system-component'
import { FormControl, FormGroup } from 'styled-form-component'
import { TypesUser } from '../../utils/TypeUsers'
import { CustomButton } from '../CustomButton'
import { Button } from 'styled-bootstrap-components'
import { Form } from './style'
import { Link } from '@reach/router'
import { useModalValue } from '../../hooks/useModalValue'
import { CustomModal } from '../CustomModal'
import { useUserDataAPI } from '../../hooks/useUserDataAPI'
import { Ripple } from 'react-awesome-spinners'
import { Span } from 'styled-base-components'
import { SERVICE_USER_URL } from '../../utils/Constants'

const initialFormValues = {
  id: 0,
  name: '',
  age: 0,
  personTypeId: 1
}

function useUserData (userID) {
  const [loading, setLoading] = useState(false)
  const [valuesForm, setFormData] = useState(initialFormValues)

  const onChange = (event) => {
    const { target } = event
    const { name, value } = target
    event.persist()
    setFormData({ ...valuesForm, [name]: value })
  }
  if (userID) {
    useEffect(function () {
      setLoading(true)
      window.fetch(`${SERVICE_USER_URL}/${userID}`)
        .then(res => res.json())
        .then(response => {
          setFormData({ ...response })
          setLoading(false)
        })
    }, [])
  }

  return { loading, valuesForm, onChange }
}

export const FormPerson = ({ userId }) => {
  const { loading, valuesForm, onChange } = useUserData(userId)
  const { isShowing, toggle } = useModalValue()
  const { responseData, errors, loadState, onSubmit } = useUserDataAPI(valuesForm, userId ? 'PUT' : 'POST', toggle)

  return (
    loading
      ? <Ripple />
      : <Form onSubmit={onSubmit} hide={toggle}>
        {
          (userId !== undefined) &&
            <FormGroup row justify>
              <Column sm={2}>
                <label>Person Id</label>
              </Column>
              <Column sm={10}>
                <FormControl name='id' disabled={!!userId} placeholder='Person Id' onChange={onChange} value={valuesForm.id} />
              </Column>
            </FormGroup>
        }
        <FormGroup row justify>
          <Column sm={2}>
            <label>Person Name</label>
          </Column>
          <Column sm={10}>
            <FormControl name='name' type='text' placeholder='Person Name' onChange={onChange} value={valuesForm.name} />
          </Column>
        </FormGroup>
        <FormGroup row justify>
          <Column sm={2}>
            <label>Person Age</label>
          </Column>
          <Column sm={10}>
            <FormControl name='age' type='number' placeholder='Person Age' onChange={onChange} value={valuesForm.age} />
          </Column>
        </FormGroup>
        <FormGroup row justify>
          <Column sm={2}>
            <label>Type User</label>
          </Column>
          <Column sm={10}>
            <FormControl name='personTypeId' onChange={onChange} value={valuesForm.personTypeId} select>
            return (
              {TypesUser.map((typeUser, index) => (
                <option key={index} value={typeUser.id}>{typeUser.name}</option>
              ))}
            )
            </FormControl>
          </Column>
        </FormGroup>
        <Link to='/'><CustomButton primary textContent='Go Back' /></Link>
        <Button success type='submit'>Save</Button>
        <CustomModal isShowing={isShowing} hide={toggle} title='User Information'>
          {
            !loadState ?
              errors.size > 0
                ? <>
                  <h2>Error</h2>
                  <CustomButton danger textContent='Close' />
                </>
                : <>
                  <Span m2 textWeightBold>Operation Success</Span>
                  <Link to='/'><CustomButton success textContent='Close' /></Link>
                </>
              : <Ripple />
          }
        </CustomModal>
      </Form>
  )
}
