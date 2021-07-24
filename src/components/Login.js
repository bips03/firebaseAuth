import React from "react";
import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link,  Redirect,  useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [curUser, setCuruser] = useState();
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState("");
  const { loginUser, user } = useAuth();
  const history = useHistory();

  if(user){
    return <Redirect to='/' />
  }

  const handleChange = (e) => {
    const obj = { ...curUser, [e.target.name]: e.target.value };
    setCuruser(obj);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBtnDisable(true);
    try {
      await loginUser(curUser.email, curUser.password);
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
          <h2 className="w-100 text-center">Login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handleChange}
                name="password"
                required
              />
            </Form.Group>
            <Button disabled={btnDisable} className="w-100 mt-4" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Not a member? <Link to="/signup">Sign up</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Forgot Password? <Link to="/reset">Reset Password</Link>
      </div>
    </>
  );
}

export default Login;
