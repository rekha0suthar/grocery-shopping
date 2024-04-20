import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import ProductComp from "../components/ProductComp";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // fetch cart product from backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/order_list");
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <DashboardNav />
      <div className="cart-container">
        <div>
          <ProductComp
            heading="Orders"
            products={orders}
            message="No orders found"
            isCart={false}
          />
        </div>
      </div>
    </>
  );
};

export default Orders