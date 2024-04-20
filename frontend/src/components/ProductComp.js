import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const ProductComp = ({
  heading,
  products,
  message,
  handleRemoveFromCart,
  handleUpdateQuantity,
  isCart,
}) => {
  return (
    <div>
      <h3>{heading}</h3>
      {products.length === 0 ? (
        <div className="cart-wrapper">
          {/* {message} */}
          <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" />
          </div>
      ) : (
        <div className="cart-wrapper">
          {products.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Img src={product.image_url} />
                <Card.Body>
                  <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>
                      {product.price}/{product.unit}
                    </Card.Subtitle>

                    {isCart ? (
                      <Card.Text>
                        Qty:{" "}
                        <input
                          type="number"
                          value={product.quantity}
                          min={1}
                          onChange={(e) =>
                            handleUpdateQuantity(product._id, e, product.name)
                          }
                        />
                      </Card.Text>
                    ) : (
                      <Card.Text>Qty: {product.quantity}</Card.Text>
                    )}
                  </div>
                  {isCart && (
                    <Button
                      variant="outline-danger"
                      type="submit"
                      onClick={(e) => handleRemoveFromCart(e, product._id)}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <hr />
            </Col>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComp;
