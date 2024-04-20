import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../containers/DashboardNav";
import axios from "axios";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category_list");
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product", {
        name: productName,
        price,
        unit,
        quantity,
        expiry_date: expiryDate,
        image_url: imageUrl,
        category: selectedCategory,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="outer-wrapper">
      <DashboardNav />
      <div
        className="inner-wrapper d-flex align-items-center  
    justify-content-center"
      >
        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
          <h3>Add Product</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price </Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Product unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Enter Product expiry date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Product imageurl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category...</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="button" variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
