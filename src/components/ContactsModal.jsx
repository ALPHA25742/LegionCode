import React,{useRef} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider.jsx'

export default function ContactsModal({closeModal}) {
  const idref=useRef()
  const nameref=useRef()
  const {createContact}=useContacts()
  function handleSubmit(e){
    e.preventDefault()
    createContact(idref.current.value,nameref.current.value)
    closeModal()
  }
  return (
    <div>
      <Modal.Header closeButton>create contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>id</Form.Label>
            <Form.Control type="text" ref={idref} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>name</Form.Label>
            <Form.Control type="text" ref={nameref} required/>
          </Form.Group>
          <Button type='submit' className='mt-3' variant='dark'>create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
}
