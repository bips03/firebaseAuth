import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const [curUser, setCurUser] = useState({
    email: "",
    password: "",
  });
  const { createUser } = useAuth();
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  // updating user state
  const handleChange = (e) => {
    const obj = { ...curUser, [e.target.name]: e.target.value };
    setCurUser(obj);
  };

  const submitUser = async (event) => {
    setError("");

    event.preventDefault();

    try {
      setBtnDisable(true);
      await createUser(curUser.email, curUser.password);

      history.push("/");
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

          <h2 className="w-100 text-center"> Sign Up </h2>
          <Form onSubmit={submitUser}>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={curUser.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={curUser.password}
                name="password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button disabled={btnDisable} className="w-100 mt-4" type="submit">
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="mt-4 text-center w-100 ">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default Signup;
