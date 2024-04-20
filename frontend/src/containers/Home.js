import React from "react";
import HomeNav from "./HomeNav";

const Home = () => {
  return (
    <div className="outer-wrapper">
      <HomeNav />
      <div
        className="inner-wrapper d-flex align-items-center  
    justify-content-center"
      >
        <h1>Welcome to Grocery Store</h1>
      </div>
    </div>
  );
};

export default Home;
