import React, { useRef, useState } from "react";
import { Button, Card, Form,Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Update() {
  const displayName = useRef();
  const pw = useRef();
  const picUrl = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { update, updateName , updatePassword } = useAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if(displayName.current.value!==null){
        console.log('h')
        await updateName(displayName.current.value);
      }
      if(picUrl.current.value !== ''){
        console.log('e')
        await update(picUrl.current.value)
      }
      if (pw.current.value !== '') {
        console.log('y')
        await updatePassword(pw.current.value);
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Card>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Successful</Alert>}
        <h2 className="w-100 text-center mt-2">Update Profile</h2>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mt-4">
            <Form.Label>Display Name</Form.Label>
            <Form.Control type="name" ref={displayName} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Leave Empty If do not wish to change"
              type="password"
              required={false}
              ref={pw}
            />
          </Form.Group>
          <Form.Group className="mt-3 w-100">
            <Form.Label>Profile Picture Url</Form.Label>
            <Form.Control className="w-100" type="name" ref={picUrl} />
          </Form.Group>
        <Button type="submit" className="w-100 btn btn-primary mt-3">
          Update Profile
        </Button>
        </Form>
        <Link className="w-100 btn btn-primary mt-3 mb-2" to="/">
          Go Back
        </Link>
      </Card.Body>
    </Card>
  );
}
