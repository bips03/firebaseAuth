import React, { useState, useRef } from "react";
import { Card, Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Reset() {
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { reset } = useAuth();
  

  const emailRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBtnDisable(true);
    try {
      await reset(emailRef.current.value);
      setSuccess("Check email for further instructions");
    } catch (error) {
      setError(error.message);
    }
    setBtnDisable(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <h2 className="w-100 text-center">Reset Password</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={btnDisable} className="w-100 mt-4" type="submit">
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Not a member? <Link to="/signup">Sign up</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Already a member? <Link to="/login">Login</Link>
      </div>
    </>
  );
}
