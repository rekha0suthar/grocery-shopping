import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeNav from "../containers/HomeNav";

const Login = () => {
  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate()

  // onSubmit handler function
  const handleLogin = async (e) => {
    e.preventDefault()
    // Add logic
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password})
      const userType = response.data.user_type
      navigate (`/dashboard?userType=${userType}`)
    } catch (error) {
      console.error("Registration error", error);
      setError("Registration failed");
      setShowErrorAlert(true);
    }
  };
  return (
    <div className="outer-wrapper">
      <HomeNav />
      {showErrorAlert && <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>{error}</Alert>}
      <div
        className="inner-wrapper d-flex align-items-center  
    justify-content-center"
      >
        <Form className="rounded p-4 p-sm-3" onSubmit={handleLogin}>
          <h3>Login</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
         
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>

          <Button
            className="button mb-2"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted">
              Don't have an account,{" "}
              <Link to="/register">Click here to Sign up!</Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
