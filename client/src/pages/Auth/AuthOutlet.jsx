import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AuthOutlet({ children, header }) {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs="6">{children}</Col>
      </Row>
    </Container>
  );
}

export default AuthOutlet;
