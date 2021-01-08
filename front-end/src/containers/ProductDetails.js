import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import './ProductDetails.css'
import 'path';
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


        setProduct(product);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function deleteProduct() {
    return API.del("minions-market", `/minions/${id}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Tem certeza que deseja fazer esta reserva?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);

    try{
      await deleteProduct();
      alert("Produto reservado!");
      history.push("/");
    }catch(e){
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="ProductDetails">
      {product && (
        <section class="content"> 
          <div class = "prod-details-start">
            <div class="card">
              <img src= {`../${product.photos}`}  alt={product.photos}/>
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
              value={product.description}
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

