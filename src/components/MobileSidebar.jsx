import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations.jsx";
import Contacts from "./Contacts.jsx";
import ConversationsModal from "./ConversationsModal.jsx";
import ContactsModal from "./ContactsModal.jsx";
import { useConversations } from "../contexts/ConversationsProvider.jsx";

export default function MobileSidebar({ id,close }) {
  const [contactsModal,setContactsModal]=useState(false)
  const [conversationsModal,setConversationsModal]=useState(false)
  const {conversations}=useConversations()
  return (
    <div className="flex-column">
      <h2>Contacts</h2>
      <Contacts/>
      <Button className="rounded-4 my-2" variant="dark" onClick={()=>setContactsModal(true)}>
          new Contact
        </Button>
      <h2 className="my-2 mt-3">Conversations</h2>
      <div className={`${conversations.length!=0?"my-2":"my-1"}`}>
      <Conversations close={close}/>
      </div>
      <Button className="rounded-4 my-2" variant="dark" onClick={()=>setConversationsModal(true)}>
          new Conversation
        </Button>
        <div className="p-2">
          ur id: <span>{id}</span>
        </div>

      <Modal show={contactsModal} onHide={()=>setContactsModal(false)}>
        <ContactsModal closeModal={()=>setContactsModal(false)}/> 
      </Modal>
      <Modal show={conversationsModal} onHide={()=>setConversationsModal(false)}>
        <ConversationsModal closeModal={()=>setConversationsModal(false)}/> 
      </Modal>
    </div>
  );
}
