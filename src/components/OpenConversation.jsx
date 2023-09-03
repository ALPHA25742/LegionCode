import React, { useState,useRef, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const Ref=useCallback(node=>node?.scrollIntoView({smooth:true}),[])
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.receipients.map((r) => r.id),
      text
    );
    setText("");
  }
  return (
    <div className="d-flex flex-column flex-grow-1 mt-3">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            let lastMsg = selectedConversation.messages.length-1===index
            // console.log(message.fromMe);
            return (
              <div
                key={index}
                className={`flex-column ${
                  message.fromMe ? "align-self-end" : "align-items-start"
                }`}
                ref={lastMsg?Ref:null}
              >
                <div
                  className={`rounded-4 px-3 py-1 ${
                    message.fromMe ? "bg-dark text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit" variant="dark">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
