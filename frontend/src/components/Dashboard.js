import React, { useEffect, useState } from "react";
import DashboardNav from "../containers/DashboardNav";
import axios from "axios";
import ProductByCategory from "./ProductByCategory";
import { Link, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [searchParams] = useSearchParams()
  const [userType, setUserType ] = useState(searchParams.get("userType"))
  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product_list");
      const sortedProductsByCategory = response.data.map(({ category, products }) => ({
        category,
        products: products.reverse()
      }));
      setProductsByCategory(sortedProductsByCategory);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserType(searchParams.get("userType"))
    // Fetch categories from backend
    fetchProductsByCategory();
  }, [searchParams]);

  return (
    <div>
      <DashboardNav userType={userType} />
      {productsByCategory.length > 0 ? <ProductByCategory productsByCategory={productsByCategory} fetchProductsByCategory={fetchProductsByCategory} userType={userType} /> : (
        <p className="empty-dashboard">
          Nothing added to Dashboard.{" "}
          {userType === "admin" && <Link to="/category">Click here to add categories.</Link> }
        </p>
      )}
    </div>
  );
};

export default Dashboard;
