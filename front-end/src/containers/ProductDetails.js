import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import './ProductDetails.css'

export default function ProductDetails() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadProduct() {
      return API.get("minions-market", `/minions/${id}`);
    }

    async function onLoad() {
      try {
        const product = await loadProduct();
        const { minionId, productName, unitPrice, amount } = product;

        setProduct(product);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  async function handleSubmit(event) {
  
    event.preventDefault();
    setIsLoading(true);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  }

  return (
    <div className="ProductDetails">
      {product && (
        <section class="content">
          <div class = "prod-details-start">
            <div class="card">
              <img src="minion-face.png" alt="Avatar"/>
              <div class="card-container">
                <h4><b>{product.productName}</b></h4>
                <p>R$ {product.unitPrice}</p>         
              </div>
            </div>
          </div>
          <div  class = "product-description">
            <p class = "label">Descrição do produto</p>
            <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing."
            />
            </Form.Group>
          </div>  
          <div class = "div-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Control
                  autoFocus
                  type="email"
                  placeholder = "e-mail"
                />
              </Form.Group>
              <Form.Group size="lg" controlId="amount">
                <Form.Control
                  placeholder="Quantidade desejada"
                />
              </Form.Group>
              <Form.Group size="lg" controlId="carholder">
                <Form.Control
                  placeholder="Nome no Cartão"
                />
              </Form.Group>
              <Form.Group size="lg" controlId="card-number">
                <Form.Control
                  placeholder="Número no Cartão"
                />
              </Form.Group>
              <LoaderButton
              block
              size="lg"
              type="submit"
              isLoading={isLoading}
              >
                  Confirmar
              </LoaderButton>
            </Form>
          </div>
        </section>
      )}
      
    </div>
  );
}

