import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";
import useAxios from "axios-hooks";

import { useAuth } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Profile() {
  const { logout, token } = useAuth();
  const [{ data, loading, error }] = useAxios({
    url: "http://localhost:8000/api/transactions/user",
    method: "post",
    data: { token: token },
  });

  useEffect(() => {
    console.log(error?.response?.data);
    if (
      error?.response?.data &&
      error?.response?.data?.data === "Token expired"
    ) {
      toast.error("Token expired");
      logout();
    }
  }, [error]);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs="6">
          <Card style={{ marginTop: "25%" }}>
            {loading && <p>Loading ...</p>}
            {!loading && (
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <p>
                  if you want to see the sunshine, you have to weather the storm
                </p>
                <h5>Name: {data?.data?.name}</h5>
                <h5>Email: {data?.data?.email} </h5>
                <Button onClick={logout}>Logout</Button>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
