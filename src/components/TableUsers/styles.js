import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding-top: 8px;
  cursor: pointer;
  & svg { // El svg dentro del boton lo estilaremos
    margin-right: 4px;
  }
`
