import React from "react";
import "./Home.css";
export default function Home() {
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
            <div id="products">
              <div class="card">
                <img src="minion-face.png" alt="Avatar"/>
                <div class="card-container">
                  <h4><b>Produto</b></h4>
                  <p>R$ 500,00</p>
                  <button type="button" name="reserve"><p>Reservar</p></button>
                </div>
              </div>
              <div class="card">
                <img src="minion-face.png" alt="Avatar"/>
                <div class="card-container">
                  <h4><b>Produto</b></h4>
                  <p>R$ 500,00</p>
                  <button type="button" name="reserve"><p>Reservar</p></button>
                </div>
              </div>
              <div class="card">
                <img src="minion-face.png" alt="Avatar"/>
                <div class="card-container">
                  <h4><b>Produto</b></h4>
                  <p>R$ 500,00</p>
                  <button type="button" name="reserve"><p>Reservar</p></button>
                </div>
              </div>
            </div>
          </section>
    </div>
  );
}
