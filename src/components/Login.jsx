import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
// import '../styles.css'

export default function Login({ onIdSubmit}) {
  const idRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }
  function createNewId() {
    onIdSubmit(uuidV4());
    }
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="you can use anything :p"
            ref={idRef}
            required
            style={{}}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="mt-3">
          Hop in!
        </Button>
        <Button className="mt-3 ms-2" variant="outline-dark" onClick={createNewId}>
          Generate ID
        </Button>
      </Form>
    </Container>
  );
}
