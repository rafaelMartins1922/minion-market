import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from './Routes';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import {Auth} from "aws-amplify";
import {useHistory} from "react-router-dom";
import { onError } from "./libs/errorLib";
import './index.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating,setIsAuthenticating] = useState(true);
  const history = useHistory();

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
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    history.push("/login");
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
           
            <Navbar.Collapse className = "justify-content-end">
              <Nav activeKey = {window.location.pathname}>
                {
                  isAuthenticated ? (
                    <>
                      <Nav.Link onClick = {handleLogout}>Logout</Nav.Link>
                      <LinkContainer to = "/cart">
                        <Nav.Link href="/cart" >Carrinho</Nav.Link>
                      </LinkContainer>
                    </>
                  ): (
                    <>
                      <LinkContainer to = "/signup">
                      <Nav.Link href="/signup" >Sign up</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to = "/login">
                      <Nav.Link href="/login" >Login</Nav.Link>
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
