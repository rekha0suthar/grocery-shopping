import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeNav from "../containers/HomeNav";

const Register = () => {
  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [userType, setUserType] = useState("user");
  const navigate = useNavigate();

  // onSubmit handler function
  const handleRegister = async (e) => {
    // Add logic
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Password does not match");
      setShowErrorAlert(true);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
        user_type: userType,
      });
      setSuccessMessage(response);
      setShowSuccessAlert(true);
      navigate("/login");
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        if (userType === "admin") {
          setError("Admin already exists");
        } else {
          setError("User already exists");
        }
      } else {
        setError("Registration failed");
      }
      setShowErrorAlert(true);
    }
  };
  return (
    <div className="outer-wrapper">
      <HomeNav />
      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
        >
          {error}
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          {successMessage}
        </Alert>
      )}
      <div
        className="inner-wrapper d-flex align-items-center  
    justify-content-center"
      >
        <Form className="rounded p-4 p-sm-3" onSubmit={handleRegister}>
          <h3>Register</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserType">
            <Form.Label>User Type </Form.Label>

            <Form.Select
              aria-label="User"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>Select</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button className="button mb-2" variant="primary" type="submit">
            Register
          </Button>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted">
              Already have an account,{" "}
              <Link to="/login">Click here to login!</Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
