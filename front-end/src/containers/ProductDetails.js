import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import './ProductDetails.css'
import 'path';
import {useFormFields} from '../libs/hooksLib';

export default function ProductDetails() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    amount:0,
    cardholder:"",
    cardNumber: "",
    reserved: 1,
    productName: null
  });
  
  useEffect(() => {
    function loadProduct() {
      return API.get("minions-market", `/minions/${id}`);
    }

    async function onLoad() {
      try {
        const product = await loadProduct();
        setProduct(product);
        fields.productName = product.productName;
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function updateProduct() {
    return API.put("minions-market", `/minions/reserve/${id}`,{
      body: fields
    });
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
      const executed = await updateProduct();
      console.log(executed);
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
                  value={fields.email}
                  onChange={handleFieldChange}
                  placeholder = "e-mail"
                />
              </Form.Group>
              {/* <Form.Group size="lg" controlId="amount">
                <Form.Control
                  type="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                  placeholder="Quantidade desejada"
                />
              </Form.Group> */}
              <Form.Group size="lg" controlId="cardholder">
                <Form.Control
                  type="text"
                  value={fields.cardholder}
                  onChange={handleFieldChange}
                  placeholder="Nome no Cartão"
                />
              </Form.Group>
              <Form.Group size="lg" controlId="cardNumber">
                <Form.Control
                  type="text"
                  value={fields.cardnumber}
                  onChange={handleFieldChange}
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

