import React, {useState} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ConversationsModal({closeModal}) {
  const [checkedContactIds, setCheckedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  function  handleCheckBoxChange(id) {
    if (checkedContactIds.includes(id)) {
      setCheckedContactIds(checkedContactIds.filter((item) => item !== id));
    } else {
      setCheckedContactIds([...checkedContactIds, id]);
    }
  }
  function handleSubmit(e) {  
    e.preventDefault();
    // console.log(checkedContactIds);
    createConversation(checkedContactIds);
    closeModal();
  }
  return (
    <div>
      <Modal.Header closeButton>create conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check type="checkbox" label={contact.name} value={checkedContactIds.includes(contact.id)} onChange={()=>handleCheckBoxChange(contact.id)} />
            </Form.Group>
          ))}
          <Button type="submit" variant="dark">create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
