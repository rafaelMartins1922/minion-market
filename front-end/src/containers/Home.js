import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [minions, setMinions] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const minions = await loadMinions();
        setMinions(minions);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadMinions() {
    return API.get("minions-market", "/minions");
  }

  function renderLander() {
    return (
      <div> Nenhum produto encontrado.</div>
    );
  }

  function renderProducts() {
    return (
      <div id="products">
              
      {minions.map(({ minionId, productName, unitPrice }) => (
        <div class="card">
        <img src="minion-face.png" alt="Avatar"/>
        <div class="card-container">
          <h4><b>{productName}</b></h4>
          <p>R$ {unitPrice}</p>
          <LinkContainer key={minionId} to={`/minions/${minionId}`}>
            <button type="button" name="reserve"><p>Reservar</p></button>
          </LinkContainer> 
        </div>
      </div>
      ))}
        </div>
    );
  }

  return (
    <div className="Home">
      <section id="start-section">
            <div class="spirals">
              <img src="spiral.png" alt="Spiral" height = "35vh" width = "35vw"/>
              <img src="spiral.png" alt="Spiral" height = "35vh" width = "35vw"/>
            </div>
            <div class="start-img-tile">
              <img id="minion-face" src="minion-face.png" alt="minion-face"></img>
              <div className="lander">
                <h1>Minions' Market</h1>
              </div>
            </div>
            <div class="spirals">
              <img src="spiral.png" alt="Spiral" height = "35vh" width = "35vw"/>
              <img src="spiral.png" alt="Spiral" height = "35vh" width = "35vw"/>
            </div>
          </section>
          <section id="content">
            <div id="intro">
              <div id="intro-text">
                <p>O Minions’ Market busca oferecer as melhores miniaturas de minions por preços justos.</p>
                <p>Reserve a sua! É só clicar em "reservar", preencher o formulário com suas informações e confirmar</p>
              </div>
              <img src="three_minions_looking_up.png" alt="minions looking up"/>
            </div>
            {isAuthenticated ? renderProducts() : renderLander()}
          </section>
    </div>
  );
}


  //{isAuthenticated ? renderProducts() : renderLander()}