import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/category", {
        name: categoryName,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="outer-wrapper">
      <div
        className="inner-wrapper d-flex align-items-center  
    justify-content-center"
      >
        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
          <h3>Add Category</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <Button className="button mb-2" variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;
