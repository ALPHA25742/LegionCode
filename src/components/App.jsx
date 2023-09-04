import Login from "./Login.jsx";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import Dashboard from "./Dashboard.jsx";
import { ContactsProvider } from "../contexts/ContactsProvider.jsx";
import { ConversationsProvider } from "../contexts/ConversationsProvider.jsx";
import { SocketProvider } from "../contexts/SocketProvider.jsx";
import { useEffect } from "react";

function App() {
  const [id, setId] = useLocalStorage("id");
  useEffect(()=>{
    const pingServer = async () => {
      const res = await fetch("https://legioncode-backend.onrender.com");
      // const res = await fetch("http://localhost:3000/ping");
      const data = await res.json();
      console.log(data);
    };
    pingServer();
  },[])
  const dashboard = (
    <SocketProvider id={id}>
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
