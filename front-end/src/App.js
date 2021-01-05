import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from './Routes';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to = "/">
          <Navbar.Brand href = "/" className="font-weight-bold text-muted">
            Home
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className = "justify-content-end">
          <Nav activeKey = {window.location.pathname}>
            <LinkContainer to = "/signup">
            <Nav.Link href="/singup" >signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to = "/login">
            <Nav.Link href="/login" >login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes/>
    </div>
  );
}

export default App;