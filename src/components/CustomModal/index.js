import React from 'react'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle
} from 'styled-modal-component'

export const CustomModal = ({ children, title, isShowing, hide }) => {
  return (
    <div>
      <Modal hidden={isShowing} toggle={hide}>
        <ModalHeader>
          <ModalTitle><h2>{title}</h2></ModalTitle>
        </ModalHeader>

        <ModalBody>
          {children}
        </ModalBody>
      </Modal>
    </div>
  )
}
