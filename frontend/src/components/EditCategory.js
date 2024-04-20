import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/category/${categoryId}`
        );
        setCategoryName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/category/${categoryId}`, {
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
          <h3>Edit Category</h3>

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
            Edit Category
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditCategory;
