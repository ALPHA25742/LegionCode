import React, { useCallback, useContext,useEffect,useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import { useContacts } from "./ContactsProvider.jsx";
import { useSocket } from "./SocketProvider.jsx";
const ConversationsContext = React.createContext();
export function useConversations() {
  return useContext(ConversationsContext);
}
export function ConversationsProvider({ children, id }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts();
  const socket = useSocket()

  function createConversation(receipients) {
    // receipients is an array of ids
    // console.log(receipients,conversations);
    setConversations((prevconversations) => {
      return [...prevconversations, { receipients, messages: [] }];
    });
  }

  const addMessageToConversation=useCallback(({receipients, text, sender})=>{
    setConversations(prevConversations=>{
      let madeChange = false//means we dont have any conversation that matched the reciepients list
      const newMessage={sender,text}
      const newConveresations = prevConversations.map(conversation=>{
        if(arrayEquality(conversation.receipients,receipients)){
          madeChange=true
          return {...conversation,messages:[...conversation.messages,newMessage]}
        }
        return conversation
      })
      if(madeChange){
        return newConveresations
      }else{
        return [...prevConversations,{receipients, messages:[newMessage]}]
      }
    })
  },[setConversations])

  useEffect(()=>{
    if(socket==null) return
    socket.on('receive-message',addMessageToConversation)
    return ()=>socket.off('receive-message')
  },[socket,addMessageToConversation])

  function sendMessage(receipients, text){
    socket.emit('send-message',{receipients,text})
    addMessageToConversation({receipients, text, sender:id})
  }

  const formattedConversations = conversations.map((conversation, index) => {
    //attaching names to receipients if the names exists
    const receipients = conversation.receipients.map((receipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === receipient;
      });
      const name = (contact && contact.name) || receipient; 
      return { id: receipient, name };
    });

    const messages= conversation.messages.map(message=>{
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe=id===message.sender
      // console.log(fromMe);
      return {...message,senderName:name,fromMe}
    })

    //checking if its selected or not
     const selected = index===selectedConversationIndex
    return { ...conversation, messages,receipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    selectedConversation:formattedConversations[selectedConversationIndex],
    createConversation,
  };
  // console.log(formattedConversations);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a,b){
  if(a.length!==b.length) return false
  a.sort()
  b.sort()
  return a.every((element,index)=>{
    return element===b[index]
  })
}
