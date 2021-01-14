import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Cart.css";
import { API } from "aws-amplify";
import { LinkContainer} from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import LoaderButton from '../components/LoaderButton';

export default function Cart() {
    const [minions,setMinions] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    function loadMinions() {
        return API.get('minions-market','/minions');
    }
    
    useEffect(() => {
        async function load() {
            try {
                const list = await loadMinions();
                setMinions(list);
                console.log(minions);
            }catch(e){
                onError(e);
            }
        }
        load();
        setIsLoading(false);
    },[]);
    
    return (
        <div className='Cart'>
            {!isLoading && (
                <section class='content'>
                <div class = "cart-list">
                    {minions.map( ({productId, productName, description, amount, unitPrice, photos}) => (
                    <LinkContainer key = {productId} to={`/`}>
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
                            <LoaderButton className="cart-button">
                                Remover do carrinho
                            </LoaderButton>
                            </div>
                        </ListGroup.Item>
                    </LinkContainer>
                    ))}
                </div>
                <div class = "confirm-purchase">
                    <p> Total: R4 **,**</p>
                    <button>Confirmar compra</button>
                </div>
           </section>
            )}
        </div>
    )
}
