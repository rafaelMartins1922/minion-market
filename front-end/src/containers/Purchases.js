import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Purchases.css";
import { API } from "aws-amplify";
import { LinkContainer} from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export default function Cart() {
    const [minions,setMinions] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    function loadMinions() {
        return API.get('minions-market','/cart-purchases');
    }
    
    async function load() {
        try {
            const list = await loadMinions();
            const purchases = list.filter((minion) => {
                return minion.productStatus == "bought"
              } );
            setMinions(purchases);
            console.log(purchases);
        }catch(e){
            onError(e);
        }
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
                        </ListGroup.Item>
                    ))}
                </div>
           </section>
            )}
        </div>
    )
}
