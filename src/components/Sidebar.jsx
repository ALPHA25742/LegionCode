import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations.jsx";
import Contacts from "./Contacts.jsx";
import ConversationsModal from "./ConversationsModal.jsx";
import ContactsModal from "./ContactsModal.jsx";

const conversationsKey = "coversations";
const contactsKey = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(conversationsKey);
  const conversationsOpen = activeKey == conversationsKey;
  const [modalopen,setModalopen]=useState(false)
  const closeModal=()=>setModalopen(false)
  return (
    <div style={{ width: "250px" }} className="d-none d-md-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        {/* onselect lets us change the active tab */}
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={conversationsKey}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contactsKey}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={conversationsKey}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contactsKey}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          ur id: <span>{id}</span>
        </div>
        <Button className="rounded-0" variant="dark" onClick={()=>setModalopen(true)}>
          new {conversationsOpen ? "conversations" : "contacts"}
        </Button>
      </Tab.Container>

      <Modal show={modalopen} onHide={closeModal}>
        {conversationsOpen ? <ConversationsModal closeModal={closeModal}/> : <ContactsModal closeModal={closeModal} />}
      </Modal>
    </div>
  );
}
