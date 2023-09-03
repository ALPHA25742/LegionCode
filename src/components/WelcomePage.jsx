import React from "react";

export default function WelcomePage({ mobileView }) {
  return (
    <h3
      className="d-flex m-3 text-center align-items-center justify-content-center flex-column flex-grow-1"
      style={{color:'rgb(0 0 0 / 85%)' }}
    >
      Welcome to LegionCode! <br />A real-time minimal chat space. <br />
      {mobileView && (
        <span>
          Click on the menu icon on the top left to access ur chats and
          contacts.
          <br />
        </span>
      )}
      We hope u enjoy ur stay here :)
    </h3>
  );
}
