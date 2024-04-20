import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import { useNavigate } from "react-router-dom";
import ProductComp from "../components/ProductComp";
import PriceComp from "../components/PriceComp";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState()
  const [totalItems, setTotalItems] = useState()
  const navigate = useNavigate()

  // fetch cart product from backend 
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart_items");
      setCart(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };

  // fetch checkout details from backend
  const fetchCheckout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/checkout_items")
      setTotalItems(response.data.total_items)
      setTotalPrice(response.data.total_price)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCart();
    fetchCheckout()
  }, []);

  // quantity update method
  const handleUpdateQuantity = async (productId, e, productName) => {
    e.preventDefault()
    try {
      setQuantity(e.target.value)
      await axios.put(`http://localhost:5000/cart/${productId}`, { quantity: quantity, name: productName });
      fetchCart()
      fetchCheckout()
    } catch (error) {
      console.error(error);
    }
  };

  // item remove from cart method
  const handleRemoveFromCart = async (e, productId) => {
    e.preventDefault()
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`)
      fetchCart()
      fetchCheckout()

    } catch (error) {
      console.error(error)
    }
  }

  // checkout handler
  const handleCheckout = async (e) => {
    navigate('/checkout')
  }
 
  return (
    <>
      <DashboardNav />
      <div className="cart-container">
          <ProductComp heading="Cart" products={cart} message="Your cart is empty" handleRemoveFromCart={handleRemoveFromCart} handleUpdateQuantity={handleUpdateQuantity} isCart={true} />
       {cart.length > 0 && <PriceComp totalItems={totalItems} totalPrice={totalPrice} handleCheckout={handleCheckout} buttonMessage="Checkout" /> }
      </div>
    </>
  );
};

export default Cart;
