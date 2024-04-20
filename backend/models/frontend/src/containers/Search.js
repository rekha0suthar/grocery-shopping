import React, { useEffect, useState } from "react";
import ProductByCategory from "../components/ProductByCategory";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchProducts, setSearchProducts] = useState([]);
  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search?query=${query}`
        );
        setSearchProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQueryDetails();
  }, [query]);
  return (
    <div>
      <div className="search-wrapper">
        {" "}
        <Link to="/dashboard">Back</Link>
        <h3>Search Results ...</h3>
      </div>
      {searchProducts.length > 0 ? (
        <ProductByCategory productsByCategory={searchProducts} />
      ) : (
        <div className="cart-container">
          <div className="cart-wrapper">
            <img
              src="https://cdn.dribbble.com/users/898770/screenshots/3744292/search-bar.gif"
              alt="No result found"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
