import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import AuthOutlet from "./AuthOutlet";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
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
    console.log(formData)
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/transactions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful.");
        navigate("/", { replace: true });
      } else {
        alert(data.data);
      }
    } catch (err) {
      alert("Error");
      console.error(err.message);
    }
  };
  return (
    <AuthOutlet>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"  placeholder="Enter name" name="name"  minLength={4}  onChange={(e) => handleChange(e)} value={formData.name}  required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>s
          <Form.Control type="email"  name="email"  placeholder="Enter email" onChange={(e) => handleChange(e)} value={formData.email} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} value={formData.password} minLength={4} 
              pattern="(?=.*\d)(?=.*[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%\^&*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{4,}"
                required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"  name="confirmPassword" onChange={(e) => handleChange(e)} placeholder="Confirm Password" value={formData.confirmPassword}  minLength={4} 
              pattern="(?=.*\d)(?=.*[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%\^&*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{4,}"
               required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </AuthOutlet>
  );
}

export default Register;
