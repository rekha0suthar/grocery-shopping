import React from "react";
import CustomNav from "../components/CustomNav";

const DashboardNav = ({ userType }) => {
  const adminLinks = [
    { label: "Add Product", url: "/product" },
    { label: "Add Category", url: "/category" },
    { label: "Cart", url: "/cart" },
    { label: "Orders", url: "/orders" },
  ];

  const userLinks = [
    { label: "Cart", url: "/cart" },
    { label: "Orders", url: "/orders" },
  ]
  
  return (
    <CustomNav
      brandName="Dashboard"
      brandLink="/dashboard"
      links={userType === 'admin' ? adminLinks : userLinks}
      isDashboard={true}
    />
  );
};

export default DashboardNav;
