import React,{useRef} from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider.jsx";

export default function Conversations({ close }) {
  const { conversations, selectConversationIndex } = useConversations();
  const windowWidth = useRef(window.innerWidth);
  return (
    <>
      <ListGroup variant="flush">
        {conversations.length == 0 ? (
          <ListGroup.Item>U need to add conversations!</ListGroup.Item>
        ) : (
          conversations.map((conversation, index) => (
            <ListGroup.Item
              key={index}
              action
              active={conversation.selected}
              variant="secondary"
              onClick={() => {
                selectConversationIndex(index);
                windowWidth.current <= 768?close(true):''
              }}
            >
              {conversation.receipients?.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </>
  );
}
