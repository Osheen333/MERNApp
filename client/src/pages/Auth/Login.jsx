import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import AuthOutlet from "./AuthOutlet";
import {useAuth} from "../../context/AuthContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthOutlet>
      <h1>Login</h1>
      <Form onSubmit={(e) => { e.preventDefault(); login(email,password)} }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"  placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
              required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="forgot-password text-right">
            <a href="/register">Sign Up</a>
          </p>
      </Form>
    </AuthOutlet>
  );
}

export default Login;
