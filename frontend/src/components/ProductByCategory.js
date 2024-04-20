import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DateFormat from "./DateFormat";

const ProductByCategory = ({
  productsByCategory,
  fetchProductsByCategory,
  userType,
}) => {
  const navigate = useNavigate();

  // category-product delete function
  const handleCategoryDelete = async (e, categoryId) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/category/${categoryId}`);
      fetchProductsByCategory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (e, productId) => {
    e.preventDefault();
    navigate(`/product/${productId}`);
  };

  // product delete function
  const handleProductDelete = async (e, productId) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      fetchProductsByCategory();
    } catch (error) {
      console.error(error);
    }
  };

  // Cart
  const addToCart = async (
    e,
    id,
    name,
    price,
    unit,
    quantity,
    expiry_date,
    image_url
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/cart", {
        id,
        name,
        price,
        unit,
        quantity,
        expiry_date,
        image_url,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">
      {productsByCategory.map(({ category, products }) => (
        <div key={category._id}>
          <div className="category">
            <h2 className="category-name">{category.name} </h2>
            {userType === "admin" && (
              <>
                <Link to={`/category/${category._id}`}>
                  <AiFillEdit />
                </Link>
                <Button
                  variant="outline-danger"
                  onClick={(e) => handleCategoryDelete(e, category._id)}
                >
                  <FaTrash />
                </Button>{" "}
              </>
            )}
          </div>

          <Row xs={1} sm={2} md={3} lg={4} xl={7} className="g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Col key={product._id}>
                  <Card>
                    <Card.Img variant="top" src={product.image_url} />
                    <Card.Body>
                      <div>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle>
                          {product.price}/{product.unit}
                        </Card.Subtitle>
                      </div>
                      <Card.Text>Qty: {product.quantity}</Card.Text>
                      <Card.Text>
                        Expiry: {<DateFormat dateStr={product.expiry_date} />}
                      </Card.Text>
                      <div>
                        {product.quantity > 0 ? (
                          <Button
                            variant="outline-success"
                            type="submit"
                            onClick={(e) =>
                              addToCart(
                                e,
                                product._id,
                                product.name,
                                product.price,
                                product.unit,
                                1,
                                product.expiry_date,
                                product.image_url
                              )
                            }
                          >
                            ADD
                          </Button>
                        ) : (
                          <Button
                            variant="outline-warning"
                            style={{ cursor: "not-allowed" }}
                          >
                            SOLD
                          </Button>
                        )}
                        {userType === "admin" && (<><Button
                          variant="outline-primary"
                          type="submit"
                          onClick={(e) => handleEdit(e, product._id)}
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="outline-danger"
                          type="submit"
                          onClick={(e) => handleProductDelete(e, product._id)}
                        >
                          DELETE
                        </Button> </>)}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No product added</p>
            )}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ProductByCategory;
