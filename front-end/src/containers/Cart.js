import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Cart.css";
import { API } from "aws-amplify";
import { LinkContainer} from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import LoaderButton from '../components/LoaderButton';
import {Auth} from 'aws-amplify';

export default function Cart() {
    const [minions,setMinions] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    function loadMinions() {
        return API.get('minions-market','/cart-purchases');
    }
    const [total,setTotal] = useState(0);
    const [isGettingExpenditures,setIsGettingExpenditures] = useState(false);
    async function load() {
        try {
            const list = await loadMinions();
            const productsOnCart = list.filter((minion) => {
                return minion.productStatus != "bought"
              } );
              console.log(list);
            setMinions(productsOnCart);
        }catch(e){
            onError(e);
        }
    }

    function getExpenditures() {
        setIsGettingExpenditures(true);
        let totals = 0;
        minions.forEach((minionProduct)=> {
            totals+= totals + minionProduct.unitPrice;
            console.log(totals);
        });
        setTotal(totals);
        setIsGettingExpenditures(false);
    }

    useEffect(() => {
        load();
        setIsLoading(false);
    },[]);

    async function removeFromCart(id) {
        setIsLoading(true);
        await API.del("minions-market",`/cart-purchases/${id}`);
        load();
        setIsLoading(false);
        getExpenditures();
    }
    
    async function purchaseCartItems() {
        try{
            setIsLoading(true);
            const user = await Auth.currentAuthenticatedUser();
            const purchasedItems = await API.put("minions-market", "/cart-purchases/many", {
                body:{minions,
                email:user.attributes.email}
            })
            console.log(purchasedItems);
            minions.forEach(async (minion) => {
                await API.del("minions-market",`/minions/${minion.productId}`);
            });
            load();
            alert('Compra realizada, você receberá um e-mail de notificação desta compra.')
        }catch(e){
            onError(e);
        }
        setIsLoading(false);
    }
    return (
        <div className='Cart'>
            {!isLoading && (
                <section class='cart-content'>
                <div class = "cart-list">
                    {minions.map( ({productId, productName, description, amount, unitPrice, photos}) => (
                        <ListGroup.Item className="cart-element">
                        <div className="cart-image">
                            <img src = {`../${photos}`} alt ="image"/>
                        </div>
                            <div class="title-description">
                                <p class="title">{productName}</p>
                                <p class="description">{description}</p>
                            </div>
                            <div class = 'price'>
                                <p>R${unitPrice}</p>
                            </div>
                            <div className="card-button">
                            <LoaderButton key = {productId} className="remove-from-cart" onClick={() => removeFromCart(productId)}>
                                Remover do carrinho
                            </LoaderButton>
                            </div>
                        </ListGroup.Item>
                    ))}
                </div>
                    {
                        minions.length > 0 && (
                        
                        <LoaderButton onClick={purchaseCartItems} disabled = {isLoading} isLoading ={isLoading}>
                            Confirmar compra
                        </LoaderButton>
                        )
                    }
           </section>
            )}
        </div>
    )
}
