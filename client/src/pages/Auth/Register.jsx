import React, { useState } from "react";
import AuthOutlet from "./AuthOutlet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password?.trim() !== confirmPassword?.trim()) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:8000/api/transactions/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful.");
        navigate("/login", { replace: true });
        return;
      } else {
        toast.error(data?.data);
      }
    } catch (err) {
      toast.error("Error: Please try again after some time");
      console.error(err.message);
    }
  };
  return (
    <AuthOutlet>
      <Card style={{ marginTop: "25%" }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                minLength={4}
                onChange={(e) => handleChange(e)}
                value={formData.name}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>s
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => handleChange(e)}
                value={formData.email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                value={formData.password}
                minLength={4}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{12,}$"
                required
              />
              <Form.Text className="text-muted">
                Password must contain at least 12 characters with:
                <br />- one or more special char
                <br />- one or more number
                <br />- one or more uppercase letter
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                minLength={4}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{12,}$"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </AuthOutlet>
  );
}

export default Register;
