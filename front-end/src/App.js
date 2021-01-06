import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from './Routes';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import {Auth} from "aws-amplify";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating,setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  }
    
  return (
    (!isAuthenticating && (
      <>
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
                {
                  isAuthenticated ? (
                    <>
                      <Nav.Link onClick = {handleLogout}>Logout</Nav.Link>
                    </>
                  ): (
                    <>
                      <LinkContainer to = "/signup">
                      <Nav.Link href="/singup" >signup</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to = "/login">
                      <Nav.Link href="/login" >login</Nav.Link>
                      </LinkContainer>
                    </>
                  )
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <AppContext.Provider value = {{isAuthenticated,userHasAuthenticated}}>
            <Routes/>
          </AppContext.Provider>
        </div>
      </>
    ))
    
  );
}

export default App;
