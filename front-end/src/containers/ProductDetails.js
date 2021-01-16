import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import './ProductDetails.css'
import 'path';
import {useFormFields} from '../libs/hooksLib';
import {Auth} from 'aws-amplify';

export default function ProductDetails() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    cardholder:"",
    cardNumber: "",
    address:""
  });
  const [showForm,setShowForm] = useState(false);
  const formButtons = React.createRef(); 
  
  useEffect(() => {
    function loadProduct() {
      return API.get("minions-market", `/minions/${id}`);
    }

    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const product = await loadProduct();
        setProduct(product);
        fields.email = user.attributes.email;
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  async function addToCart(){
    try{
      setIsLoading(true);
      const isAlreadyAdded = (await API.get("minions-market",`/cart-purchases/${product.productId}`))? true:false;
      if(isAlreadyAdded){
        alert('Esse produto já está no carrinho.');
        setIsLoading(false);
        return;
      }
      const productAddedToCart = await API.post('minions-market','/cart-purchases', {
        body: product
      });
      console.log(productAddedToCart);
    }catch(e){
      onError(e);
    }
    alert('Produto adicionado ao carrinho.');
    setIsLoading(false);
  }

  async function buyProduct() {
    const prod = await API.get("minions-market",`/cart-purchases/${id}`);
    if(prod){
      await API.put("minions-market",`/cart-purchases/${id}`,{
        body: {
          ...fields,
          productStatus: "bought"
        }
      });
    }else{
      console.log(fields);
      const log = await API.post("minions-market","/cart-purchases",{
        body:{
          ...product,
          ...fields,
          productStatus: "bought"
        }
      });
      console.log(log);
    }
    
    return API.del("minions-market", `/minions/${id}`);
  }

  function renderForm(){
    
    if(showForm) {
      return (
        <>  
            <p>Para finalizar sua compra, preencha os dados de pagamento abaixo. Você precisará de um cartão de crédito ou débito</p>
            <div class = "div-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="address">
                <Form.Control
                  type="text"
                  value={fields.address}
                  onChange={handleFieldChange}
                  placeholder="Endereço para entrega."
                />
              </Form.Group>
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
              <LoaderButton type="submit" size="lg" disabled = {isLoading} isLoading={isLoading}>
                Confirmar
              </LoaderButton>
            </Form>
            </div>
        </>
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Tem certeza que deseja fazer esta reserva?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsLoading(true);

    try{
      const executed = await buyProduct();
      alert("Produto reservado!");
      history.push("/");
    }catch(e){
      onError(e);
      setIsLoading(false);
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
          {renderForm()}
          <div class="details-page-buttons">
            <LoaderButton
              block
              size="lg"
              type="submit"
              disabled = {isLoading}
              isLoading={isLoading}
              onClick={addToCart}
              className="button-add-to-cart"
            >Adicionar ao carrinho</LoaderButton>
            {
              showForm?
              <LoaderButton size="lg" type="submit" disabled = {isLoading} isLoading={isLoading} onClick={() => setShowForm(false)}>
                Cancelar
              </LoaderButton>
              :
              <LoaderButton size="lg" type="submit" disabled = {isLoading} isLoading={isLoading} onClick={() => {
                setShowForm(true);
              }}
              >Finalizar compra</LoaderButton>
            }
            
          </div>
        </section>
      )}
      
    </div>
  );
}

