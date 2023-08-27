import Login from "./Login.jsx";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import Dashboard from "./Dashboard.jsx";
import { ContactsProvider } from "../contexts/ContactsProvider.jsx";
import { ConversationsProvider } from "../contexts/ConversationsProvider.jsx";
import { SocketProvider } from "../contexts/SocketProvider.jsx";

function App() {
  const [id, setId] = useLocalStorage("id");
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
