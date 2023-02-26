import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import AuthOutlet from "./AuthOutlet";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthOutlet>
      <Card style={{marginTop: "25%"}}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <p className="forgot-password text-right">
              <a href="/register">Sign Up</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </AuthOutlet>
  );
}

export default Login;
