import React from "react";
import { Button } from "react-bootstrap";

const PriceComp = ({ totalItems, totalPrice, handleCheckout, buttonMessage }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <div className="checkout-wrapper">
        <p>
          Subtotal: <strong> ₹ {totalPrice} </strong>
        </p>
        <p>
          Items: <strong>{totalItems} </strong>
        </p>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleCheckout(e)}
        >
          {buttonMessage}
        </Button>
      </div>
    </div>
  );
};

export default PriceComp;
