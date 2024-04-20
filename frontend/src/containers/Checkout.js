import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PriceComp from "../components/PriceComp";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [totalItems, setTotalItems] = useState();
  const navigate = useNavigate();

  // fetch checkout details from backend
  const fetchCheckout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/checkout_items");
      setTotalItems(response.data.total_items);
      setTotalPrice(response.data.total_price);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  // checkout handler
  const handlePayment = async (e) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to complete your payment?"
      );
      if (confirm) {
        await axios.post("http://localhost:5000/orders");
        alert("Your payment is complete. Order has been placed successfully");
        navigate("/orders");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="cart-container">
      <div>
        <h3>Checkout</h3>
        <div className="cart-wrapper second">
          <div>
            <h5>Step 1. Select Address</h5>
            <select>
              <option value="a" selected={true}>
                RJ Road, Near MK Hospital, Bangalore, 560067
              </option>
              <option>MR Road, Near Ganesh Tempple, Tamil nadu, 570003</option>
              <option>23, Main Road, Shimla, 534666</option>
              <option>
                {" "}
                <a href="/">+ More</a>
              </option>
            </select>
            <br />
            <br />
          </div>
          <div>
            <h5>Step 2. Select Payment method</h5>
            <select>
              <option>Wallet</option>
              <option>UPI</option>
              <option>Net Banking</option>
              <option>Card(Debit/Credit)</option>
              <option>Pay on delivery</option>
            </select>
          </div>
        </div>
      </div>

      <PriceComp
        totalItems={totalItems}
        totalPrice={totalPrice}
        handleCheckout={handlePayment}
        buttonMessage="Proceed to Pay"
      />
    </div>
  );
};

export default Checkout;
