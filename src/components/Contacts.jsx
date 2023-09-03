import React from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { ListGroup } from "react-bootstrap";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    <>
      {contacts.length == 0 ? (
        <ListGroup variant="flush" className="my-1">
            <ListGroup.Item>U need to add contacts!</ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup variant="flush">
          {contacts.map((contact) => (
            <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
