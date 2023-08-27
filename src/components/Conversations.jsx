import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider.jsx";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  // console.log(conversations);
  return (
    <>
      <ListGroup variant="flush">
        {conversations &&
          conversations.map((conversation, index) => (
            <ListGroup.Item key={index} action
            active={conversation.selected}
            variant="secondary"
            onClick={()=>selectConversationIndex(index)}>
              {conversation.receipients?.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}
