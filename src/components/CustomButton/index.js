import React from 'react'
import { Button } from 'styled-bootstrap-components'

export const CustomButton = (props) => {
  return (<Button m1 {...props}>{props.textContent}</Button>)
}
