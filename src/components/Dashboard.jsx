import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { Offcanvas } from "react-bootstrap";
import OpenConversation from "./OpenConversation.jsx";
import { useConversations } from "../contexts/ConversationsProvider.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import WelcomePage from "./WelcomePage.jsx";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  const windowWidth = useRef(window.innerWidth);
  const [show, setShow] = useState(false);
  const mobileView=(windowWidth.current <= 768)
  return (
    <div
      className={`d-flex ${mobileView ? "flex-column" : ""}`}
      style={{ height: "100vh" }}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        className="bi bi-list d-md-none m-2 btn"
        viewBox="0 0 16 16"
        onClick={() => setShow(true)}
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>

      <Sidebar id={id} />

      {selectedConversation ? <OpenConversation />:<WelcomePage mobileView={mobileView}/>}

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MobileSidebar id={id} />
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  );
}
