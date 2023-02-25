import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useAuth} from '../../context/AuthContext';
import { useLocalStorage } from "../../hooks/useLocalStorage";
function Profile({data}) {
  const {logout, user} = useAuth();
  const [userDetails, setUserDetails] =  useLocalStorage("userDetails", data);;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/transactions/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user,
          }),
        });
        console.log('one')
        const data = await response.json();
        console.log('otwone')

        await setUserDetails(data.data);
        console.log('three')

        console.log('hello',userDetails,'heelo')
        if(data.data === 'Token expired'){
           console.log('four')

          alert('Token expired');
          logout();
        }
      } catch (error) {
        console.log('five')

        alert('Error');
        logout();
      }
    };

    fetchUserData();
  }, []);
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs="6">
          <h1>Profile</h1>
          <p>if you want to see the sunshine, you have to weather the storm</p>
          <h5>Name: {userDetails?.name}</h5>
          <h5>Email: {userDetails?.email} </h5>
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
